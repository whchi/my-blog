---
title: '[推薦]物件導向的 SOLID 原則'
date: 2022-11-18T19:31:01+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: '越基礎越抽象'
preview_figure: ''
preview_figcaption: ''
---
# Source
https://www.youtube.com/watch?v=dGbzlsBuw9M

# Summary
講得十分本質，比起追逐新潮名詞，顧好 SOLID 的根本就可以寫出好程式了

* conway 定律：軟體系統的最佳結構與團隊的組織社會結構互相影響

1. SRP: 一種分類的方法，一個模組應該只對一種角色負責，只有當角色的需求改變了模組才會改變，為 DDD 的本質
2. OCP: 利用 SRP 與 DIP 的規範設計出符合此原則的程式而非為了遵循此原則而寫
3. LSP: 模組只需知道合約的行為，繼承合約的實作不可因互相替換後影響程式
4. ISP: 模組不應依賴不屬於該模組所需要方法；no god interface/object
5. DIP: 高層次（角色）不該依賴於低層次（IO），比如直接在 controller 裡面叫 orm 就不是好寫法，應該另外拉個 service interface 後去注入他

