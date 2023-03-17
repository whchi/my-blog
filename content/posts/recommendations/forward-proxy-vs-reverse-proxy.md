---
title: '[推薦] 正向代理 vs 反向代理'
date: 2023-03-17T23:28:49+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: '後端的前面就是前端，前端的後面就是後端'
preview_figure: ''
preview_figcaption: ''
---

# Source
https://www.youtube.com/watch?v=4NB0NDtOwIQ 5:16

# Summary

所謂的正向、反向只是發起端的區別—從你出去經過的就是正向；反之是反向。

proxy 通常講的是端對端連線時中間過濾請求的那層服務，通常是使用 web server(Apache, NGINX, IIS) 實作


* 正向代理（forward proxy）：你連出去時經過的 proxy
  * 保護你的 IP 不被暴露，因為出去後都是 proxy IP
  * 跳過一些瀏覽的限制，比如變成土耳其人去訂閱 youtube premium 省錢
  * 阻擋連到不該看的網站，比如在公司網路不能看 A 片
* 反向代理（reverse proxy, **a.k.a API gateway**）：其他人連到你這裡時經過的 proxy
  * 保護網站 IP，別人不知道你的實際位置在哪
  * 負載平衡
  * 快取內容
* transparent proxy(強制代理)：攔截網路傳遞封包，進行解析並依規則處理封包流向，屬於 L4 的功能
