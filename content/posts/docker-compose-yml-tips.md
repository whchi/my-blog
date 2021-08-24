---
title: 'Docker Compose yml 小技巧'
date: 2020-12-22T16:26:41+08:00
draft: false
author: 'whchi'
tags: ['docker', 'time-saving']
summary: ''
---
1. 設定多個 hosts
```yml
version: '3.8'
x-hosts: &x-hosts
  - 'mysql:172.29.0.3'
  - 'app:172.29.0.4'
  - 'influxdb:172.29.0.5'
...
app:
    extra_hosts: *x-hosts
```
2. build with context
```yml
...
app:
    build:
        context: .
        dockerfile: ./.docker/Dockerfile.xxx-xx
```
3. connect other network
* bridge
```yml
# docker-compose-1.yml
version: '3.7'
...
services:
  svc1:
    networks:
      - custom_name
networks:
  custom_name: # 這邊是類似 namespace 的概念
    driver: bridge
# docker-compose-2.yml
version: '3.7'
...
services:
  svc1:
    networks:
      - mynet
...
networks:
  mynet:
    external:
      name: folder_custom_name
```
* pre-existing
```yml
version: '3.7'
...
services:
  svc1:
    networks:
      - network_name
# 只要指定 external true 即可
networks:
  network_name:
    external: true
```
4. virtual volume
用他的好處是不用特別綁定路徑，且也可避免 host 真的要裝該服務時路徑衝突問題，比較適用的場景為一次只有一個專案的情境
```yml
...
services:
  postgres:
    image: postgres:13.2
    restart: unless-stopped
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=root
    volumes:
      - postgres:/var/lib/postgresql/data
volumes:
  postgres:
```
