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
