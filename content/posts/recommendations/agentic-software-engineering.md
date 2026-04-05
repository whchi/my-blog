---
title: '[推薦] Agentic Software Engineering'
date: 2026-04-05T08:02:12+08:00
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
https://x.com/ashpreetbedi/status/2028176285575594465

# Summary
雖然是一篇自家產品的宣傳文，不過概念很不錯，提出建立 product-ready 的 agent 應有的 6 大要素

1. Durability（耐久性）

Agent 會跨多步驟推理，工具可能 timeout 或在中途失敗。如果在第 12 步崩潰，不能直接從頭重跑（可能造成重複副作用或遺失上下文）。需要支援 pause、resume、checkpoint、graceful recovery，讓失敗變成「繼續執行」而不是重啟。

2. Isolation（隔離性）

同時服務成千上萬用戶，每個用戶要有自己的 session、記憶、上下文。不能只傳 user_id 就了事，所有資料庫、向量資料庫、模型呼叫都要嚴格隔離。一個 filter 沒加好，就可能造成資料外洩。

3. Governance（治理機制）

Agent 能行動，就可能造成損害。查詢資料沒問題，但刪除資料或退款就需要審核。需要分層權限：有些工具自動執行、有些需要用戶批准、有些需要管理員批准。未來 agent 越強，governance 就會變成產品的核心差異。

4. Persistence（持久性）

沒有持久化儲存，agent 就無法學習、累積上下文、越用越好。必須把 session、記憶、知識存進資料庫，讓每一次對話都讓下一次變得更好。

5. Scale（擴展性）

同時上千用戶請求時，會遇到模型 rate limit、工具延遲、外部依賴 downtime 等問題。傳統服務呼叫自己的後端，agentic 軟體卻要呼叫外部模型和第三方工具，因此需要能處理自己無法控制的依賴。

6. Composability（可組合性）

當 agent 變成一個 service 後，其他 agent、前端、Slack bot、MCP client 都可以透過標準 API 呼叫它。這讓單一 agent 能組成多 agent 系統。
