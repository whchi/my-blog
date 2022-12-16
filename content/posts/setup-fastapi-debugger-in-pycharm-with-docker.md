---
title: 'Setup Fastapi Debugger in Pycharm With Docker'
date: 2022-12-16T11:58:19+08:00
draft: false
author: 'whchi'
tags: ['python', 'fastapi', 'docker']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

The key is running only one worker when start uvicorn

# 0. Dockerfile

A Dockerfile which only runs non-application part, like database/redis...etc

Here I use docker-compose as example
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
# 1. setup Run/Debug configurations

It's on the top-right corner
![](https://i.imgur.com/0xynoAW.png)

# 2. setup local running configuration

choose "fastapi" for running configuration

**remember to set `--workers=1`**

![](https://i.imgur.com/2iU74Bq.png)

# 3. setup container running configuration

choose docker-compose for your configuration
![](https://i.imgur.com/Jh35GwE.png)

# 4. add local configuration

At "Before launch" setting, add your local running configuration
![](https://i.imgur.com/Mbi4urj.png)

complete setup
![](https://i.imgur.com/lCvuFlq.png)

# 5. start debugger as a happy debugger

![](https://i.imgur.com/8WN6yD0.png)
