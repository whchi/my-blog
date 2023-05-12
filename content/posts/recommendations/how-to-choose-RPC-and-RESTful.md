---
title: '[推薦] 如何選擇 RPC 或是 RESTful'
date: 2023-05-12T09:13:30+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source
https://twitter.com/alexxubyte/status/1656686865452503040

# Summary

* RPC
  * 高耦合：要知道對方想做什麼
  * 高效能：走 binary、protobuf，不用解析 data 後再處理邏輯
  * 難讀：相比 RESTful 來說更難 debug
  * 行為導向：function to function
* RESTful
  * 低耦合：不用知道對方想做什麼
  * 低效能：相比 RPC 來說更慢
  * 好讀：human readable
  * 資源導向
