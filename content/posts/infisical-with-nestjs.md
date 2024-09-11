---
title: 'Use Self-Host Infisical With Nestjs'
date: 2024-09-11T23:29:05+08:00
draft: false
author: 'whchi'
tags: ['infisical', 'node', 'nestjs']
summary: ''
preview_figure: ''
preview_figcaption: ''
toc: true
---
需要注意的是，Infisical 有許多進階功能需要付費，在使用前要多考量


## setup infisical
- .env
```.env
# Required key for platform encryption/decryption ops
# Generate by executing: openssl rand -hex 16
ENCRYPTION_KEY=

# Required secret for signing JWT tokens
# Generate by executing: openssl rand -base64 32
AUTH_SECRET=

# Postgres credentials
POSTGRES_USER=infisical
POSTGRES_DB=infisical
POSTGRES_PASSWORD=

SITE_URL=https://infisical.mydomain.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_FROM_NAME=Infisical
SMTP_FROM_ADDRESS=username@gmail.com
SMTP_USERNAME=username@gmail.com
SMTP_PASSWORD=

DB_CONNECTION_URI=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
TELEMETRY_ENABLED=false
REDIS_URL=redis://redis:6379
```
- docker-compose.yml
```yml
services:
  db-migration:
    container_name: infisical-db-migration
    depends_on:
      db:
        condition: service_healthy
    image: infisical/infisical:v0.80.0-postgres
    env_file: .env
    command: npm run migration:latest
    networks:
      - infisical

  backend:
    container_name: infisical-backend
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
      db-migration:
        condition: service_completed_successfully
    image: infisical/infisical:v0.80.0-postgres
    env_file: .env
    ports:
      - 8080:8080
    environment:
      - NODE_ENV=production
    networks:
      - infisical

  redis:
    image: redis:7.2-alpine
    container_name: infisical-redis
    env_file: .env
    environment:
      - ALLOW_EMPTY_PASSWORD=yes
    networks:
      - infisical
    volumes:
      - redis_data:/data

  db:
    container_name: infisical-db
    image: postgres:16-alpine
    restart: always
    env_file: .env
    volumes:
      - pg_data:/var/lib/postgresql/data
    ports:
      - 5432:5432
    networks:
      - infisical
    healthcheck:
      test: "pg_isready --username=${POSTGRES_USER} && psql --username=${POSTGRES_USER} --list"
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  pg_data:
    driver: local
  redis_data:
    driver: local

networks:
  infisical:

```

## 整合進 NestJS
- 安裝 sdk
```shell
npm install @infisical/sdk
```

- `infisical.module.ts`
```ts
import { DynamicModule, Global, Module } from '@nestjs/common';
import { InfisicalClient } from '@infisical/sdk';
import { InfisicalService } from './infisical.service';
import { InfisicalModuleOptions } from './infisical-module-options.type';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class InfisicalModule {
  static forRoot(options: InfisicalModuleOptions): DynamicModule {
    return {
      imports: [
        // fallback to dotenv
        ConfigModule.forRoot({
          envFilePath: options.fallbackFile,
        }),
      ],
      module: InfisicalModule,
      providers: [
        {
          provide: 'INFISICAL_OPTIONS',
          useValue: { ...options },
        },
        {
          provide: InfisicalClient,
          useFactory: (config: ConfigService) => {
            return new InfisicalClient({
              siteUrl: config.get<string>('INFISICAL_SITE_URL'),
              auth: {
                universalAuth: {
                  clientId: config.get<string>('INFISICAL_CLIENT_ID', ''),
                  clientSecret: config.get<string>('INFISICAL_CLIENT_SECRET', ''),
                },
              },
            });
          },
          inject: [ConfigService],
        },
        InfisicalService,
      ],
      exports: [InfisicalService],
    };
  }
}

```

- `infisical.service.ts`
```ts
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InfisicalClient } from '@infisical/sdk';
import { InfisicalModuleOptions } from './infisical-module-options.type';

@Injectable()
export class InfisicalService implements OnModuleInit {
  private logger = new Logger(InfisicalService.name);
  private fallbackToConfig = false;
  private secrets: Record<string, string | boolean | undefined> = {};
  private readonly initializationPromise: Promise<void>;
  private readonly PROCESS_ENVS: string[] = [
    'DATABASE_URL',
    'GOOGLE_APPLICATION_CREDENTIALS',
  ];

  constructor(
    private readonly config: ConfigService,
    private readonly client: InfisicalClient,
    @Inject('INFISICAL_OPTIONS') private readonly options: InfisicalModuleOptions,
  ) {
    this.initializationPromise = this.init();
  }

  async onModuleInit() {
    await this.initializationPromise;
  }

  private async init() {
    if (!this.config.get<string>('INFISICAL_SITE_URL')) {
      this.logger.log('Use config from ConfigService');
      this.fallbackToConfig = true;
      return;
    }
    try {
      const secrets = await this.client.listSecrets({
        environment: this.config.get<string>('INFISICAL_ENV', ''),
        projectId: this.config.get<string>('INFISICAL_PROJECT_ID', ''),
        path: this.options.path || '/', // path to infisical project's path
        includeImports: true,
      });
      secrets.forEach(secret => {
        this.secrets[secret.secretKey] = secret.secretValue;
        if (this.PROCESS_ENVS.includes(secret.secretKey)) {
          // ENVs where should load directly into process
          // like prisma's DATABASE_URL & google cloud credential
          process.env[secret.secretKey] = secret.secretValue;
        }
      });

      this.logger.log('Secrets loaded from Infisical');
    } catch (error) {
      this.logger.warn(
        'Failed to fetch secrets from Infisical, falling back to ConfigService',
      );
      this.fallbackToConfig = true;
    }
  }

  public get<T = string>(key: string): T {
    if (this.fallbackToConfig) {
      return this.config.get<T>(key) as T;
    }

    if (Object.keys(this.secrets).length > 0) {
      return this.secrets[key] as T;
    }
    const value = this.secrets[key];
    if (value === undefined) {
      return this.config.get<T>(key) as T;
    }
    return value as T;
  }
}

```

- `infisical-module-options.type`
```ts
export type InfisicalModuleOptions = {
  path?: string;
  fallbackFile?: string | string[];
};

```

## 開始使用
建立環境變數到你的`.env`
```.env
INFISICAL_ENV=dev # the slot of environments
INFISICAL_PROJECT_ID=<your-infisical-project-id>
INFISICAL_SITE_URL=<your-infisical-site-url>
INFISICAL_CLIENT_ID=<your-infisical-client-id>
INFISICAL_CLIENT_SECRET=<your-infisical-client-secret>
```
以下是每個參數對應到 infisical 的位置
- INFISICAL_ENV
![INFISICAL_ENV](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qgefx88cm51unw26q13z.png)

- INFISICAL_PROJECT_ID
![INFISICAL_PROJECT_ID](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cx4e3u6153jwrxv8abrx.png)

- INFISICAL_CLIENT_ID and INFISICAL_CLIENT_SECRET
![id and secret](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m23zablo8vskomys0qph.png)

然後把上一步完成的 module import 到 `app.module.ts`

```ts
@Module({
  imports: [InfisicalModule.forRoot({path: '/'})]
})
```
你就可以像使用 `NestJS` 的 `ConfigService` 一樣地使用它
```ts
infisicalService.get<string>('YOUR_ENV_SETUP_IN_INFISICAL')
```

That is
