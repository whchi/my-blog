---
title: '[推薦] 系統設計面試時的思考框架'
date: 2023-03-08T21:44:22+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source
https://www.youtube.com/watch?v=i7twT3x5yv8 9:53

# Summary
適用於大概 60 min 的面試
1. 理解問題（5 min）
   1. who is the user? what core feature to build?
   2. 釐清 non-functional requirement.(安全性、可用性...)
2. 進行高度抽象的設計並取得認同（20 min）
   1. functional-related RESTful API interfaces，注意 API 的回應資料
   2. 系統設計示意圖（user->service->database），重點在於畫出來的每個服務都是 e2e
   3. 不要太快進入細節（db scaling, concurrency, failure scenarios）
   4. data model design: **the key part of non-functional requirements**
      1. data access pattern, R/W ratio
      2. what db to choose? how to make indexes?
3. 深入設計細節（25 min）
   1. 對 non-functional requirement 更為細節的討論
   2. 闡明問題->提出 2 種解法->討論解法的 tradeoffs->選定決定解法 無限 loop
4. wrap up（5 min）
