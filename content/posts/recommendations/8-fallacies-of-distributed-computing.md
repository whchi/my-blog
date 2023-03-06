---
title: '[推薦]分布式系統的 8 個謬誤'
date: 2022-07-10T19:33:53+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: '設計分散式系統時須具備的基礎思考要點'
preview_figure: ''
preview_figcaption: ''
---

# Source
[原文](https://ably.com/blog/8-fallacies-of-distributed-computing)

[youtube 中文解說](https://www.youtube.com/watch?v=b3LNQs8UXF8)

# Summary
1. 網路是可靠的：可以設計可重做的機制（狀態池+redo）
2. 延遲為 0：LAN 與 internet 的差異，CDN 解決了延時的問題
3. 頻寬是無限的：internet 服務的頻寬可能是有限的
4. 網路是安全的
5. 網路拓墣是不變的：k8s 大流量會自動擴張、資料/程式搬移或掛掉時有無可能影響其他服務、有無避免單點故障
6. 存在網管：須去理解服務間相互依賴的關係、IaC（基礎建設及代碼）做版控、log 應該要可以監控且有效
7. 傳輸成本為 0：因跨網路，需考慮有效率的傳輸格式（gRPC、MessagePack、json、protobuf...）
8. 網路是同質的：跨服務的 protocol 可能需要轉換

