---
title: 'Connect to Existing Network in Docker'
date: 2020-03-12T17:28:18+08:00
draft: false
author: 'whchi'
tags: ['docker', 'time-saving']
summary: '記在這不然每次都忘記'
---
* docker-compose-1.yml
```yml
version: '3.7'
...
services:
  svc1:
    networks:
      - custom_name
networks:
  custom_name: # 這邊是類似 namespace 的概念
    driver: bridge
```
上面的寫法會建立一個 folder_custom_name 的 network, folder 是前綴，位置不同會變化
* docker-compose-2.yml
```yml
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
