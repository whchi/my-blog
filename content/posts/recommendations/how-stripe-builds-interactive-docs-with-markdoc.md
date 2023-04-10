---
title: '[推薦] Stripe 如何使用 Markdoc 建立互動式文件'
date: 2023-04-10T11:45:33+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---


# Source
https://stripe.com/blog/markdoc 2000+ words, 8~10 min

# Summary
公司越大的情況下文件越難維護，Stripe 這篇文章分享了他們如何使用 Markdoc 建立互動式文件，並且分享了他們的一些經驗。
- React + Markdoc + React Flow
- 使用 React 好處在於組件化的方式組合分散在 erb 與 javascript 間的變數
- Markdoc 的內容與渲染是方離的，可以更靈活地支援不同裝置
- based-on markdown-it 與 peg.js 之上，markdown-it 做分詞，peg.js 生成自訂 tag
- Makerdoc 的 AST 可以序列化成 JSON 並提供 cache
