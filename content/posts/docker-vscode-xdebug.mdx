---
title: '在 vscode 中設定 docker xdebug'
date: 2020-05-14T15:17:19+08:00
draft: false
author: 'whchi'
tags: ['docker', 'time-saving']
summary: '記錄一下比較好 copy-paste'
---

## Dockerfile
這裡只列 php 相關的
```Dockerfile
FROM centos:8

ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN yum -y install epel-release && php && php-pecl-xdebug

RUN echo "xdebug.remote_enable=1" >> /etc/php.d/15-xdebug.ini && \
echo "xdebug.remote_port=9000" >> /etc/php.d/15-xdebug.ini && \
echo "xdebug.remote_autostart=1" >> /etc/php.d/15-xdebug.ini && \
echo "xdebug.remote_connect_back=0" >> /etc/php.d/15-xdebug.ini && \
echo "xdebug.remote_handler=dbgp" >> /etc/php.d/15-xdebug.ini && \
echo "xdebug.max_nesting_level=250" >> /etc/php.d/15-xdebug.ini && \
echo 'xdebug.remote_log="/var/log/xdebug/php71-xdebug.log"' >> /etc/php.d/15-xdebug.ini && \
echo "xdebug.remote_host=docker.for.mac.localhost" >> /etc/php.d/15-xdebug.ini && \
echo "xdebug.idekey=docker" >> /etc/php.d/15-xdebug.ini

EXPOSE 22 80 443

CMD ["/usr/sbin/init"]

```
## vscode launch.json
```json
{
  "folders": [
    {
      "path": "/path/to/local/documentroot"
    }
  ],
  "settings": {},
  "launch": {
    "configurations": [
      {
        "name": "php xdebug",
        "type": "php",
        "request": "launch",
        "port": 9000,
        "pathMappings": {
          "/path/to/remote/documentroot": "${workspaceFolder}"
        }
      },
      {
        "name": "Launch currently php script",
        "type": "php",
        "request": "launch",
        "program": "${file}",
        "cwd": "${fileDirname}",
        "port": 9000
      }
    ],
    "compounds": []
  }
}
```
以上
