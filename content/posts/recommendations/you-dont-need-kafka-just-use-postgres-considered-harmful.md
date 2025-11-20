---
title: "[推薦] You Don't Need Kafka, Just Use Postgres Considered Harmful"
date: 2025-11-12T23:24:48+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
toc: false
---

# Source
<https://www.morling.dev/blog/you-dont-need-kafka-just-use-postgres-considered-harmful/?media_id=3764053151000468329_63468313506&media_author_id=63468313506&ranking_info_token=GCA1ZjFhZTUzOGIzZjQ0ZmUxYjVkMDdmOTJhZTM5MGQyMiWoy8gGFdgEFvKGpJENGBMzNzY0MDUzMDQ5NTczNzgxMDEyKANjY28A&utm_source=ig_text_post_permalink>

# Summary
文章主張「用 Postgres 取代 Kafka」的觀點有害無益，因為二者設計目的不同，應依據事件串流需求選擇 Kafka 的專長（如容錯、低延遲與連接器），而非強求單一工具導致複雜度上升與未來擴展困境。


1. **不同工具的定位**：Postgres 是關聯式資料庫，適合管理查詢關聯資料；Kafka 是事件串流平台，專為即時資料管道、微服務通訊等設計，二者目的迥異。

2. **反對「Postgres 足夠」的論點**：此類文章常強調 Kafka 運行困難或昂貴，尤其在小規模時，但忽略了 Kafka 在小規模下的可靠性與功能優勢。

3. **工作佇列的挑戰**：用 Postgres 建置佇列（如 SELECT ... FOR UPDATE SKIP LOCKED）可能導致 MVCC 膨脹和 WAL 堆積，需進行長時間效能測試。

4. **Kafka 的日誌語義**：Kafka 提供持久化有序事件日誌，支持重播、時間保留和精確一次語義，遠超簡單佇列，難以在 Postgres 上複製。

5. **容錯與高可用性**：Kafka 叢集多節點複製資料，單節點故障影響小；Postgres 寫入單一主節點，故障需手動介入或外部工具。

6. **消費者群組**：Kafka 輕鬆實現多消費者負載分擔與故障轉移；在 Postgres 上需自建領導者選舉或再平衡協議，複雜度高。

7. **低延遲處理**：Kafka 支持毫秒級延遲，適合詐欺偵測或即時搜尋；Postgres 輪詢或 LISTEN/NOTIFY 易受鎖競爭影響。

8. **連接器生態**：Kafka Connect 提供豐富的來源/目的地連接器，簡化資料整合；Postgres 無類似生態，需自製連接器。

9. **開發體驗**：Kafka 擁有成熟客戶端、模式管理和監控工具；用 Postgres 建事件串流需重構這些，增加不必要複雜度。

10. **建議使用方式**：小規模也應選對工具；常用變更資料擷取 (CDC) 和[出箱 (outbox) 模式](https://current.confluent.io/post-conference-videos-2025/ins-and-outs-of-the-outbox-pattern-bng25)，讓 Postgres 與 Kafka 互補，保持一致性並降低運維負擔。
