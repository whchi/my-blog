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
>「其實mock object在testing時非常有用，你最好也看看我的Pull Request去學一下吧」

>「用上mock object的testcase總比沒用的好
因為mock object可以讓你很專心只測試你要測的部份。
排除掉其他你所depend on的部份的bug所引起的testcase fail。」

>「但是mock object非常昂貴(指用上的額外的開發時間)
所以，我絕對不會建議你任何時候都用上mock object。」

> **『那什麼時候才應該用mock object呢？』**

>「通常我會用上mock object的時機」

>「我寫的東西要depends on 3rd party的resource，像是aws S3
與其每次test都真的跑aws去拿S3 file，我會用上mock object去偽裝aws S3的」

>「我要測試的procedure，有又臭又長的dependency。而且要depend on的module不太穏定很多bug。我會用上mock object去迴避」

>「我在寫core library(像是caching library)，我要100%清楚其怎對redis/db操作。這時我會用上mock object for redis / db。」

>「一般application logic。我是不會對db / redis做mocking的。一般而言，這時mock object帶來的好處未大得值得其大量所花的時間。」
