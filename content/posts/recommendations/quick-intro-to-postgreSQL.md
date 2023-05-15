---
title: '[推薦] 全棧數據庫 postgreSQL 好在哪？'
date: 2023-05-15T18:39:08+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source
https://www.youtube.com/watch?v=NORDs1Cq0xk 5:40

# Summary
* 近乎全部資料類型的儲存支援(time series, geo location, json, xml, data warehouse...)
* BSD 開源授權，對開發社群友好，有龐大的社群支援
* 小量資料的讀取可能不比 MySQL
* client-side program language 支援更多
* 高並發的場景下，MySQL 的 ram 消耗會更小（thread per client），pg 是 process-per-client
* pg 對 DBA 的需求比較高
