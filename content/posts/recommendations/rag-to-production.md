---
title: '[推薦] Production RAG 經驗分享'
date: 2025-10-21T08:59:56+08:00
draft: false
author: 'whchi'
tags: ['recommendation', 'RAG', 'AI']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
toc: false
---

# Source

https://blog.abdellatif.io/production-rag-processing-5m-documents#what-moved-the-needle

# Summary

1. 使用 LLM 查看整個 conversation，生出語義和關鍵字，把這些結果丟給 reranker 增加搜索範圍
2. 使用 reranker，50 chunks 輸出 15 個 chunks
3. 客製化的 chunking 策略，確保兩個關鍵
   1. 區塊不會再單詞或句子的中間被截斷
   2. 每個區塊都是單一邏輯單元，能捕捉有效資訊
4. 內文連同 metadata 一起傳給 LLM 可以取得高品質的回答（ markdown 化）
5. 建立一個小 router 判斷問題是否需要 RAG（總結這篇文章、這是誰寫的），針對這些問題直接走其他方式或是 LLM
