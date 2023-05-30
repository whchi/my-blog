---
title: '[推薦] Monolith vs Microservices vs Serverless'
date: 2023-05-30T21:30:29+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source
https://www.youtube.com/watch?v=1A9tPOfp6NA 23:04

# Summary
使用五個面向評估三種架構的優缺點

{{< table "table table-bordered table-hover">}}
| dimension                  | Monolith                                 | Microservices                                                          | Serverless                                                             |
| -------------------------- | ---------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Development experience** | ✅good, easy to develop, deploy, and test | 🫠not easy, needs some experience                                       | 🫠runtime limitations(file parsing, websockets, SSE) and security issue |
| **Scalability**            | ✅good on vertical, bad on horizontally   | ✅very good                                                             | ✅very good                                                             |
| **Response time**          | ✅quick                                   | 🫠normal, many service networking call                                  | ❌very bad, cold start + network connection + function execution        |
| **Reliability**            | ❌bad, one process down, whole app crush  | ✅good, isolation per service                                           | ✅good                                                                  |
| **Cost**                   | 🫠depends on how you scale                | ❌expensive, bin packing problem exists(cannot fully use all resources) | ✅good                                                                  |
{{< /table >}}
