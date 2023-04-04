---
title: '[推薦] Twitter 推薦演算法總覽'
date: 2023-04-04T18:11:07+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: '愚人節不愚人'
preview_figure: ''
---

twitter 在愚人節前夕開源了他的推薦演算法 source code，可以看到他們是如何運作的

# Source
https://www.youtube.com/watch?v=a8wCny94-_U 12:30

[https://github.com/twitter/the-algorithm](https://github.com/twitter/the-algorithm)

# Summary
整體來說跟其他 social network recommendation engine 差不多

想像一個訊息漏斗，由廣到深可以分為三層

1. source relevant tweets: 分為 in-network(things you follow) 和 out-of-network(推薦)
   1. 50% in network
   2. 15% social graph: 有興趣的主題或是有互動過的用戶 overlap，不會有突破同溫層的情況
   3. 35% embedding space: 主動關注過的主題或標籤組成中推薦
2. tweets are ranked: 針對每個 tweet 都依序詢問特定問題，increasing scores
   1. does this user interact with the author a lot?
   2. has the user seen a lot of this author recently?
   3. how much interest does the user have in this type of content?
   4. is the author a twitter blue subscriber?
   5. is the author Elon Musk?
3. filter out specific preference: 你的 twitter 首頁呈現的結果，decreasing scores
   1. blocked, muted, nsfw filter
   2. 避免看到太多同個 author 的 tweet
   3. 多媒體（text, image...）平均呈現
