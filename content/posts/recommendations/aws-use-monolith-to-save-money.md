---
title: '[推薦] AWS 也使用 monolith 來省錢'
date: 2023-05-07T20:25:29+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: 'serverless 多數時候比 monolith 更貴，使用時要很清楚'
preview_figure: ''
preview_figcaption: ''
---

# Source
https://www.primevideotech.com/video-streaming/scaling-up-the-prime-video-audio-video-monitoring-service-and-reducing-costs-by-90

# Summary
首先，找出燒錢的地方
1. 每分每秒對於 AWS step function 的調用
2. 為了使影片能支援 concurrency，在處理影片時會切成 frame 並上傳 image 到 S3 上，大量的使用導致費用很貴

在以上用例使用水平擴展（serverless）並無太大好處，因此將他們整和（monolith）後用用垂直擴展取代原本水平擴展要解決的問題

最終省了 90% 的費用
