---
title: 'Setup FastAPI Debugger in VSCode With Docker'
date: 2022-12-16T13:57:12+08:00
draft: false
author: 'whchi'
tags: ['python', 'fastapi', 'docker']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

The key is `launch.json` and `tasks.json` and `uvicorn --workers=1`

# Context
Local for python app, docker container for non-application services like database/redis...etc

If all of your services are run in container you SHOULD use [remote debug](https://code.visualstudio.com/docs/editor/debugging#_remote-debugging)

# 0. Dockerfile
Here I use docker-compose as example

* docker-compose.debug.yml
```yml
version: "3.8"
services:
  pgsql:
    image: postgres:13
    restart: unless-stopped
    environment:
        - POSTGRES_HOST_AUTH_METHOD=trust
        - POSTGRES_USER=root
        - POSTGRES_PASSWORD=
        - POSTGRES_DB=postgres
    volumes:
      - postgres:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    privileged: true
volumes:
  postgres:
```

## 1. setup python interpreter
`cmd+shift+p` > `python: select interpreter` > `/path/to/your/virtualenv/bin/python`


## 2. setup launch.json
click "Run and Debug" at VSCode's left menu，"create a launch.json"

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: FastAPI",
            "type": "python",
            "request": "launch",
            "module": "uvicorn",
            "args": [
              "your.entrypoint",
              "--workers=1"
            ],
            "envFile": "${workspaceFolder}/.env",
            "env": {
                "YOUR_LOCAL_ENV": "xxxxx"
            },
            "jinja": true,
            "justMyCode": true,
            "preLaunchTask": "start debug server",
            "postDebugTask": "stop debug server"
        }
    ]
}
```

## 3. setup tasks.json
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "start debug server",
            "type": "shell",
            "command": "docker-compose -f docker-compose.debug.yml up -d"
        },
        {
            "label": "stop debug server",
            "type": "shell",
            "command": "docker stop xxxxxxx-pgsql-1"
        }
    ]
}

```

## 4. Be a happy debugguy
![](https://i.imgur.com/PPsJxjX.png)
