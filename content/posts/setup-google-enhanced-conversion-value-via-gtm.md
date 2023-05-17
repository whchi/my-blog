---
title: '如何設定 Google 強化轉換的價值'
date: 2023-05-17T18:16:53+08:00
draft: false
author: 'whchi'
tags: ['seo']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

延續前一篇[《如何使用 GTM 設定 google 強化轉換》]({{< ref "/posts/how-to-setup-google-enhanced-conversion-with-gtm" >}})，當設定完畢的 Google 強化轉換價值為 0 該怎麼辦？

首先要理解的是，UA(GA3)、GTM、gtag(GA4) 這些專有名詞是不斷演進過來的，所以在使用時會容易搞混，以下簡單整理他們的概念幫助理解
{{< table "table table-bordered table-hover" >}}
|feature|concept|
|---|---|
|UA|gtag 的前身|
|gtag|google 發送與管理 GA 資料的 SDK，除了 GA 原有的資料之外也可以發送自定資料（data layer）|
|data layer|自定義的資料，講白了就是 javascript object，透過 `gtag` 調用可以增加自訂事件|
|GTM|集中管理所有的 tag 設定，包含 gtag，與他的差別在於 gtag 是更為輕量（只有 GA 資料）且沒有介面的 GTM|
{{< /table >}}

因此，在使用 gtag 的同時也可以使用 GTM，GTM 除了追蹤 gtag 本身就支援的 event 外，可以在不動到程式碼的情況下增加他追蹤的事件或條件

# 設定
在理解了上面的描述後，我們要怎麼設定轉換價值呢？

## 1. 增加轉換事件與資料
首先，在 gtag 增加轉換事件與資料，這邊以購買為例

```js
gtag(
    'event',
    'conversion',
    {
        currency: 'TWD',
        value: 1000,
        transaction_id: 'your-order-id',
        send_to: 'your-ad-id/your-conversion-label-id'
    });
```

然後你再發生轉換的頁面可以看到你的 dataLayer 會多出你設定的事件與值
{{< figure
    src="https://i.imgur.com/6BAGakf.png"
    caption="在 console 中下 dataLayer 查看">}}

## 2. 設定 GTM 追蹤事件

1. 設定 custom event 監聽 conversion 事件
{{< figure
    src="https://i.imgur.com/jfAVyZz.png"
    caption="要注意 trigger 條件是否需要設定以確保不重複觸發">}}

2. 點選 variables 選擇 data layer varrables，分別設定
   - 交易 ID：建議，避免重複轉換，可用自動生成的或是訂單編號
   {{< figure
       src="https://i.imgur.com/8n0g5m4.png">}}
   - 轉換價值
   {{< figure
       src="https://i.imgur.com/4N4Dv3h.png">}}
   - 幣別：建議，否則預設會用美金
   {{< figure
       src="https://i.imgur.com/3eJpmNZ.png">}}

3. 綁定變數與事件到轉換追蹤的 tag 上
{{< figure
    src="https://i.imgur.com/HipTceh.png">}}

## 3. 測試結果
使用 google tag assistant 進行測試，找到有觸發 tag 的事件，查看他的 variables 頁籤即可確認是否有正確接收到設定的變數
