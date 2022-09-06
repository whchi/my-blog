---
title: '使用 ssh 連入 Docker 中的 PostgreSQL'
date: 2022-09-06T16:52:57+08:00
draft: false
author: 'whchi'
tags: ['PostgreSQL', 'devops']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---

連到遠端的 database 有幾種方式

{{< table "table table-bordered" >}}
| method   | description                                               |
| -------- | --------------------------------------------------------- |
| password | 透過 TCP/IP 連入，最基本的方法，缺點是 port 會暴露給外界  |
| ssh      | 使用 ssh tunnel 的方式連入                                |
| proxy    | 透過 proxy 連入，可在 proxy 管理連線，firewall 也只需認他 |
| ssl      | 透過 https 連入，與 password 的缺點一樣                   |
{{</ table>}}
在錢不夠的情況下最基本要做的是 ssh 設定，其餘 proxy / ssl 都要花比較多的錢才能做

這裡介紹如何在機器上設定 ssh 連線

# iptables 設定
這裡透過 `ufw` 進行設定，主要就是增加一條 `127.0.0.1:5432` 的 rule
```sh
# to any 是為了程式
ufw allow from 127.0.0.1 to any port 5432
```
# docker 設定
docker 會建立獨特的 iptables rules 去達成網路環境隔離的效果，他的優先權比 ufw 高因此需再對 docker 做設定，有幾種方法

1. systemd: 於啟動處增加參數 `--iptables=false`
2. daemon.json: 於 `/etc/docker/daemon.json` 寫入 `{"iptables":false}`
3. bind ip:port

第三個方法比較適用，這裡列出 docker-compose 的寫法
```yaml
services:
  db:
    image: postgres
    volumes:
      - ./.docker/postgres/postgres.conf:/var/lib/postgresql/data/postgresql.conf
      - ./.docker/postgres/pg_hba.conf:/var/lib/postgresql/data/pg_hba.conf
    ports:
      - '127.0.0.1:5432:5432'
```
# PostgreSQL 設定
於 `pg_hba.conf` 增加來自 docker 的連線（ssh tunnel）設定以及對所有來源開放（程式）的連線設定
```conf
# TYPE  DATABASE    USER            ADDRESS                 METHOD
host    all         all             host.docker.internal    trust
host	all		    all		        0.0.0.0/0		        md5
```

上述設定都完成後就可以透過任一個 GUI tool 走 ssh 連線了

# References
* https://www.postgresql.org/docs/current/ssh-tunnels.html
* https://docs.docker.com/network/iptables/
