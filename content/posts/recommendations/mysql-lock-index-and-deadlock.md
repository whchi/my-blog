---
title: '[推薦] Mysql Lock Index and Deadlock'
date: 2022-07-02T23:29:49+08:00
draft: false
author: 'whchi'
tags: ['recommendation', 'mysql']
summary: 'lock is a good thing'
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---

# Source
[https://yuanchieh.page/posts/2022/2022-04-25-mysqllock-%E8%88%87-index-%E9%97%9C%E4%BF%82%E5%92%8C-deadlock-%E5%88%86%E6%9E%90/](https://yuanchieh.page/posts/2022/2022-04-25-mysqllock-%E8%88%87-index-%E9%97%9C%E4%BF%82%E5%92%8C-deadlock-%E5%88%86%E6%9E%90/)
# Summary
1. index 會造成寫入效能下降（lock），使用時須謹慎評估
2. 先篩選出 pk(fk) 後再使用他們避免 gap lock（不要用 where pk > ?）
3. 沒特別狀況就使用 Read Committed，因預設的 Repeatable Read 在執行 update 時會把所有的 where 條件都 lock 起來，而 RC 只要條件不符就會 release
4. 可以使用 use index 決定要使用的 index，8.0 之後排序才有意義
# Main idea
首先點出結論再依照不同類型的 index 套入 isolation level 介紹順序、gap lock 是如何造成 dead lock 的，最後給予幾點建議
