---
title: '[推薦] 12 Logging Best Practices'
date: 2025-03-08T22:17:46+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
toc: true
---

# Source

https://www.youtube.com/watch?v=I2mWnh66Bkg 12:00

# Summary
1. 寫入 log 要定義好目的，不要隨意紀錄
2. 正確地使用 Log Level
  - INFO: 值得紀錄的 business events，比如 checkout completed
  - WARN: 未來可能發生問題的紀錄，比如付款時間超過 n 秒
  - ERROR: 特定行為的錯誤，比如 db connection failed
  - FATAL: 影響整個程式的 log，比如 OOM
3. 使用 Structured log
   - 用 JSON 格式紀錄 log，方便提供 monitor 解析追蹤，每個框架 / 語言都有支援對應的 lib，比如 node.js 的 `pino`
4. 紀錄關鍵的 context
  - request IDs: microservices 間的 trace
  - user IDs: 用戶行為追蹤
  - system state data: db / cache state status
  - full error context: stack trace，方便除錯
5. 對於高流量系統善用 log sampling，降低儲存成本
6. canonical log lines，每次完整請求後加上一條描述該 request 完整描述/狀態的 log，讓追蹤 log 更容易，比如 `[UserAuth] user login attempt userId=xxxx,username=ooooo` 這樣就可以直接找 `UserAuth` 就能看完所有東西
7. 集中管理 log，比如 ELK/LGTM stack
8. 設定適合的 retention policy 避免 log 過多造成 storage 問題，可以用 log level 搭配環境來設定避免過多垃圾資料
9. 注意 log 傳輸安全，對 log system 進行 access control 與加密
10. Sensitive data 要避免紀錄在 log 中，比如密碼、信用卡資訊，真要記錄要做去識別化
11. 選擇高效能的 log lib，避免 log system 成為 bottleneck
12. 區別 log 跟 metric，use log to debug problem, use metric to know when will you have a problem
