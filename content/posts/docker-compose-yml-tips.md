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
