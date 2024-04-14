---
title: '[推薦] Load Balancing'
date: 2024-04-14T22:22:12+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---

# Source
https://samwho.dev/load-balancing/


# Summary
本文用圖像化的方式解釋了什麼是 Load Balancing 與他主要的演算法，同時給出各種算法的比較

1. Round Robin(RR): 依序分配給每個 server
2. Weighted Round Robin(WRR): 依照 server 的權重分配
   1. 手動設定
   2. 自動設定：在每一台 server 紀錄最近 n 次的平均回應時間作為權重
3. Least Connections(LC): 分配給連線數最少的 server，由 LBS 紀錄與分配
4. Peak Exponentially Weighted Moving Average(PEWMA): 結合 WRR 與 LC 的演算法，並且考慮 server 的回應時—紀錄最近 N 次的回應時間相加，越久的回應時間權重越低，然後再乘以 server 的 open connection 數，得出最後的權重


