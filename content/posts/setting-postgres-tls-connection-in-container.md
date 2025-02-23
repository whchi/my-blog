---
title: '在容器化的 PostgreSQL 中設定 TLS 連線'
date: 2025-02-23T22:59:51+08:00
draft: false
author: 'whchi'
tags: ['postgres']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
toc: true
---

當您需要允許外部連線到您的資料庫時，尤其在開發環境中，使用加密是必須的。本文介紹如何在容器化的 postgres 中設定 TLS 連線

適用 PostgreSQL 16

## PostgreSQL 客戶端連線類型
PostgreSQL 客戶端可以以六種不同的方式進行連線：

1. disabled：不使用加密。僅適用於本地網路。
2. allow：優先使用非加密連線，僅在服務器需要時使用加密。
3. prefer（多數 client 預設）：優先使用加密，但如果無法加密，則接受非加密連線。
4. require：必須使用加密，連線時不會檢查證書。
5. verify_ca：使用加密，並檢查服務器證書是否由受信任的機構簽發。
6. verify_full：最安全的選項。檢查加密、證書，並確認服務器名稱是否匹配證書。

verify_ca 和 verify_full 是最安全的選項，但需要額外的設定，又分成下面兩種情況

- 單向驗證：您需要根 CA 證書。
- 雙向驗證（mTLS）：您需要在連線字串中指定用戶端證書和金鑰，且這些證書和金鑰必須由根 CA 簽發。

## 單向驗證設定
### 1. certs and keys
設定有效期為100年，適用於開發用途。
```shell
openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout key.pem -out cert.pem -days 36500
```
### 2. 設定 postgresql.conf
在 `postgresql.conf` 中添加以下內容：
```
ssl = on
ssl_cert_file = '/var/lib/postgresql/cert.pem'
ssl_key_file = '/var/lib/postgresql/key.pem'
```
### 3. 更新訪問規則
在 `pg_hba.conf` 中添加以下內容：
```
hostssl all all all scram-sha-256
hostnossl all all all reject
```
### 4. docker-compose.yml
```yml
services:
  postgres:
    image: postgres:16.3
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_DB=postgres
    volumes:
      - ./.docker/postgres/config/pg_hba.conf:/etc/postgresql/pg_hba.conf
      - ./.docker/postgres/config/postgresql.conf:/etc/postgresql/postgresql.conf
      - ./.docker/postgres/certs/cert.pem:/var/lib/postgresql/cert.pem:ro
      - ./.docker/postgres/certs/key.pem:/var/lib/postgresql/key.pem:ro
      - postgres:/var/lib/postgresql/data
    command:
      - postgres
      - -c config_file=/etc/postgresql/postgresql.conf
      - -c hba_file=/etc/postgresql/pg_hba.conf
```

在設定完成後，您只需在連線字串中添加 `sslmode=require` 即可
```
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/database?sslmode=require"
```
## 雙向驗證設定（mTLS）
### 1. certs and keys
```shell
# 1. root CA
openssl genrsa -out root.key 4096
openssl req -x509 -new -nodes -key root.key -sha256 -days 36500 -out root.crt \
  -subj "/C=US/ST=California/L=San Francisco/O=MyCompany/OU=IT/CN=PostgreSQL Root CA"

# 2. server 證書
openssl genrsa -out server.key 4096
openssl req -new -key server.key -out server.csr \
  -subj "/C=US/ST=California/L=San Francisco/O=MyCompany/OU=Database/CN=postgres"

# SAN 必須包含所有 client 端可能連線的 DNS/IP
openssl x509 -req -in server.csr -CA root.crt -CAkey root.key -CAcreateserial \
  -out server.crt -days 36500 -sha256 \
  -extfile <(printf "subjectAltName=DNS:localhost,DNS:postgres,IP:127.0.0.1,IP:192.168.0.23")

# 3. client 證書 - CN 一定要與要連線的 postgres user 一致
openssl genrsa -out client.key 4096
openssl req -new -key client.key -out client.csr \
  -subj "/C=US/ST=California/L=San Francisco/O=MyCompany/OU=Developers/CN=postgres"
openssl x509 -req -in client.csr -CA root.crt -CAkey root.key -CAcreateserial \
  -out client.crt -days 36500 -sha256
```

如果你想要更靈活的管理 client cert，可以使用 `pg_ident.conf` 管理你的 map
```
# pg_hba.conf
hostssl all all 0.0.0.0/0 cert map=my_map
# pg_ident.conf
my_map /CN=client postgres
```

### 2. 設定 postgresql.conf
在 `postgresql.conf` 中添加以下內容：
```
ssl = on
ssl_cert_file = '/var/lib/postgresql/server.crt'
ssl_key_file = '/var/lib/postgresql/server.key'
ssl_ca_file = '/var/lib/postgresql/root.crt'
```
### 3. 更新訪問規則
在 `pg_hba.conf` 中添加以下內容：
```
hostssl all all all cert clientcert=verify-full
hostnossl all all all reject
```
### 4. docker-compose.yml
```yml
services:
  postgres:
    image: postgres:16.3
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_DB=postgres
volumes:
      - ./.docker/postgres/certs/server.crt:/var/lib/postgresql/server.crt:ro
      - ./.docker/postgres/certs/server.key:/var/lib/postgresql/server.key:ro
      - ./.docker/postgres/certs/root.crt:/var/lib/postgresql/root.crt:ro
      - postgres:/var/lib/postgresql/data
    command:
      - postgres
      - -c config_file=/etc/postgresql/postgresql.conf
      - -c hba_file=/etc/postgresql/pg_hba.conf
```

在設定完成後，連線字串增加下面幾個設定即可
- `sslmode=verify-full`
- `sslcert=client.crt`
- `sslkey=client.key`
- `sslrootcert=root.crt`
```
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/database?sslmode=verify-full&sslcert=client.crt&sslkey=client.key&sslrootcert=root.crt"
```
