---
title: '[推薦] Email Authentication'
date: 2023-08-26T16:51:01+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source

https://resend.com/blog/email-authentication-a-developers-guide

# Summary
- SPF: Sender Policy Framework
  - 用於接收信件
  - 根據發件人來源驗證是否為合法的發件人
  - 透過 DNS TXT 記錄來驗證
  - 建立寄件者白名單白名單
- DKIM: DomainKeys Identified Mail
  - 用於審核信件
  - 使用公私鑰來對 email 進行簽章
  - 收件箱收到信件後，會依照簽章與 DNS public key 來驗證
- DMARC: Domain-based Message Authentication, Reporting and Conformance
  - 處理 SPF, DKIM 失敗的操作行為：拒絕、隔離、無操作
  - 可以依照 domain 給予權重
- BIMI: Brand Indicators for Message Identification
  - 需要搭配 DMARC 設置隔離/拒絕
  - 依照品牌來判斷是否為合法的信件
  - 決定是否顯示品牌 logo

