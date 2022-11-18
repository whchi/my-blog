---
title: '[推薦] What Is Api Gateway'
date: 2022-06-07T12:08:42+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: 'gateway is a good thing'
preview_figure: ''
preview_figcaption: ''
---
# Source
https://www.youtube.com/watch?v=vHQqQBYJtLI

# Summary
1. Separate out cross cutting concerns: 把非 api 不需要關注的邏輯（ssl, 驗證, logging…）分離
2. Separate and consolidate cross cutting concerns across microservices: 路徑 proxy
3. Replacing multiple client calls with single API call. And, some features of reverse proxy: 靜態檔案與 http cache
4. Routing based on headers, paths and params etc. And, some features of Load Balancer

# Main idea
以購物車為情境，分別羅列出對應的 component 與ssl、驗證分別需要用到的地方，再將 api gateway 放入此情境中描述其用途。

大整體而言是 nginx 層，其背後概念與 middleware 相似，都是攔截 request 作處理。

自架服務有 apache, haproxy, nginx, spring cloud gateway，雲端服務有 AWS API gateway, Azure API gateway, Google Cloud Endpoints, Apigee 等

# Reference
[cross cutting concerns](https://openhome.cc/Gossip/SpringGossip/AOPConcept.html)
