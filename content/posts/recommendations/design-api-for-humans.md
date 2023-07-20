---
title: '[推薦] Design Api for Humans'
date: 2023-07-20T14:12:19+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---

# Source
https://dev.to/stripe/designing-apis-for-humans-object-ids-3o5a

這篇文章是來自 stripe 的 developer advocator 關於 API 設計所撰寫的一系列共 4 篇文章

# Summary
1. Object IDs
   1. 注意 numeric ID 的安全性，小心 [enumeration attack](https://www.upguard.com/blog/what-is-an-enumeration-attack)
   2. 讓 ID human-readable，比如使用 prefix 代表特定的 bundle context
      1. pi_ -> PaymentIntent, cus_ -> Customer
      2. 好處有可以用前綴建立黑名單，或是用前綴來做 routing
2. Error messages
   1. status code 給機器看的，message 給人看的，對 http code 要有清楚的觀念
   2. 訊息要讓開發者明白問題所在
   3. 訊息要對開發者有用："Customer id=xxxxxx not found, because you are in test mode" 比 "Customer not found" 更具備指引性
   4. 能讓開發者自己查詢問題的資訊，比如給一個 link 讓他可以看到發送的原始 request
   5. 對 server error 提供更具同理心的錯誤訊息，比如 google 可以玩小恐龍遊戲
3. Design patterns
   1. 一致性與直觀性很重要，可參考 RESTful
   2. 客製程度與可連接性需要權衡
4. Common patterns in Stripe
   1. 使用一般人也看得懂的詞彙，避免使用專業術語
   2. 使用 enum，少用 boolean：使用 enum 表示狀態只需要一個 field，而使用 boolean 表示狀態需要 n 個 field
   3. 使用 nested object 來表示可擴充的資料結構
   4. 再回應時提供 API 的 metadata，比如被呼叫的 method name，這樣對 debug 或對開發者來說都很有幫助
   5. 實踐 API 驗證與 unguessable ID

