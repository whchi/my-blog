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

docker-compose-1.yml

```yml
#
services:
  svc1:
    networks:
      - inner_name
networks:
  inner_name: # default 是預設網路，不用特別指定
    driver: bridge
    name: outer_name
```
docker-compose-2.yml
```yml
services:
  svc1:
    networks:
      - outer_name
networks:
  outer_name:
    external: true
```

4. named volume

- 優勢
1. 不用手動指定主機路徑（Docker 自動管理）
2. 避免多個容器或專案綁定同一主機目錄導致衝突
3. 資料由 Docker 完整管理，安全性高、易備份

- 適合場景

1. 不需要直接在 host 編輯或查看資料
2. 不需要跨主機共享資料（單機部署）
3. 資料庫、快取、搜尋引擎等持久化服務
4. 開發、測試、CI/CD、單機生產環境

```yml
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
