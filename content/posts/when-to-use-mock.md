---
title: '[寓言故事] When to Use Mock'
date: 2022-11-22T12:21:46+08:00
draft: false
author: 'whchi'
tags: ['fable-story']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# 路邊撿到的，不是我說的

---
「其實 mock object 在 testing 時非常有用，你最好也看看我的 Pull Request 去學一下吧」

「用上 mock object 的 testcase 總比沒用的好，因為 mock object 可以讓你很專心只測試你要測的部份。
排除掉其他你所 depend on 的部份的bug所引起的 testcase fail。」

「但是 mock object 非常昂貴(指用上的額外的開發時間)所以，我絕對不會建議你任何時候都用上 mock object。」

**『那什麼時候才應該用 mock object 呢？』**


「通常我會用上 mock object 的時機」

「我寫的東西要 depends on 3rd party 的 resource，像是 aws S3，與其每次 test 都真的跑 aws 去拿 S3 file，我會用上 mock object 去偽裝 aws S3」

「我要測試的 procedure，有又臭又長的 dependency。而且要 depend on 的 module 不太穏定很多 bug。我會用上 mock object 去迴避」

「我在寫 core library (像是 caching library )，我要 100% 清楚其怎對 redis/db 操作。這時我會用上 mock object for redis / db。」

「一般 application logic。我是不會對 db / redis 做 mocking 的。一般而言，這時 mock object 帶來的好處未大得值得其大量所花的時間。」
