---
title: 'Facebook 應用程式審查要點'
date: 2022-03-11T15:57:46+08:00
draft: true
author: 'whchi'
tags: ['instagram', 'facebook']
summary: '真的很麻煩'
preview_figure: '/images/fg-ig.png'
preview_figcaption: ''
preview_image: '/images/fg-ig.png'
---

最近幫公司串 instagram 的功能，因其屬於 facebook，所以要走他的審查，送了好幾次終於過了，紀錄一下撰寫要點

1. 影片可以只上傳一份，除非要求的權限要做的事在系統上差異較大再分開傳

2. 影片另外放 youtube 並提供連結

3. 有串接的應用程式也提供測試帳號：比如說功能是登入系統後可以取得個人的 instagram 資料，那就提供「系統登入帳號」以及「instagram 登入帳號」

4. 站在系統的角度描述用途，如下
```
本系統為 XXXXXX，該平台近期將上線「透過 instagram 進行個人相簿匯入」的功能，因此需要能取得 instagram 用戶的個人資料以及塗鴉牆多媒體資料進行匯入
使用情境如下
1. 登入系統
2. 點選「透過 ig 匯入」
3. 取得 ig 資料後點選圖片
4. 點擊上傳按鈕
影片連結： <youtube link>

驗證方式如下：

網址：https://www.example.com/my-system
帳號：test@example.com
密碼：test123456

Instagram 帳密
test_ig@example.com
xxxxxxxx
```
