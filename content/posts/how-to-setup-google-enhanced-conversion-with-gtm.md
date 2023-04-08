---
title: '如何使用 GTM 設定 google 強化轉換'
date: 2023-03-23T11:00:58+08:00
draft: false
author: 'whchi'
tags: ['seo']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

google 強化轉換是藉由網站提供第一方資料（email、手機、地址姓名）給 google 讓 google 的轉換報表更加精確的功能

所謂的「轉換」指的是點擊 google ads 之後進行的操作過程，意指廣告造成的轉換

設定有三種方式

1. Gtag(google 代碼)
2. GTM(google 代碼管理工具)
3. Google enhance conversion API(google 強化轉換 API)

準確度： 3>=1>2

處理複雜度： 3>1>2

該使用哪種方式端看對網站的掌控度有多高來決定—如果 ads 跟網站都可以掌控，那使用 3 是最好的選則

本文紀錄掌握度最低的 GTM 設定方式，詳細流程官方網站都有，因此僅紀錄關鍵的流程

> 分成 3 個步驟：設定 google Ads 轉換追蹤 > 設定 GTM 轉換代碼 > 驗證設定

# 1. 設定 google Ads 轉換追蹤
登入 google ads 設定轉換代碼
{{< figure
    src="https://i.imgur.com/VXjXW5f.png"
    caption="tools and settings > conversions">}}

新增並訂設定廣告轉換代碼
{{< figure
    src="https://i.imgur.com/hygJeh8.png"
    caption="設定完畢取得轉換 ID 與 label">}}

在同頁下方勾選啟用強化轉換
{{< figure
    src="https://i.imgur.com/Cwmdiny.png"
    caption="選擇 GTM">}}

# 2. 設定 GTM 轉換代碼
把前面取得的轉換 ID 與 label 設定到 GTM 的 tag 中
{{< figure
    src="https://i.imgur.com/9OxZvmR.png"
    caption="tag 類型為 Google Ads Conversion Tracking">}}

設定取得第一方資料的方式，有三種方式
1. 自動收集
2. javascript / css selector
3. 自訂 code

這裡使用第 3 種方式，具體實作如下
1. 在需要轉換的頁面埋設第一方資料放到 js global 變數裡面，如有資安疑慮則進行 hash(sha256)

官網表明 email, phone, address 擇一即可
```js
window.eeData = {
	email: 'example@cc.cc', // 推薦
    // hashedEmail: sha256Email
	phone: '0912xxxxxx', // 建議不要，手機很好猜
    // hashedPhone: sha256Mobile
    address: {
        firstName: 'first name',
        // hashedFirstName: sha256FirstName,
        lastName: 'last name',
        // hashedLastName: sha256LastName,
        street: '大同街',
        city: '台北市',
        region: '中山區',
        postCode: 104,
        country: '台灣'
    }
};
```
2. 讓 GTM 的「自訂 javscript」設定可以吃到
{{< figure
    src="https://i.imgur.com/w6Qgzam.png">}}
完整設定如下，如果傳送為 hash 過的資料，則要帶`sha_256_*`
```js
function(){
	return {
		"email": eeData.email,
        // "sha256_email_address": eeData.hashedEmail
		"phone_number": eeData.phone,
        // "sha256_phone_number": eeData.hashedPhone
        "address": {
            "first_name": eeData.address.firstName,
            // "address.sha256_first_name": eeData.hashedFastName
            "last_name": eeData.address.lastName,
            // "address.sha256_last_name": eeData.hashedLastName
            "street": eeData.address.street,
            "city": eeData.address.city,
            "region": eeData.address.region,
            "postal_code": eeData.address.postCode,
            "country": eeData.address.country,
        }
	}
}
```
# 3. 驗證設定
初次設定好的強化轉換代碼要等 48 小時才會看到設定結果，可以透過 google tag assistant 工具進行驗證

查看 fired tag 的 Google Ads Tracking Conversion tag，裡面會紀錄強化轉換的參數

{{< figure
    src="https://i.imgur.com/qprAsjT.png"
    caption="在 cssProvidedEnhancedConversionValue 可以看到設定的參數">}}

{{< figure
    src="https://i.imgur.com/amPnP8q.png"
    caption="或是在 variables 可以看到發送的強化轉換參數">}}

接著等待 48 小時過後看實際結果即可
{{< figure
    src="https://i.imgur.com/BlwIvw0.png">}}

# references
* [關於強化轉換](https://support.google.com/google-ads/answer/9888656?hl=zh-Hant)
* [使用 GTM 設定廣告轉換代碼](https://support.google.com/tagmanager/answer/6105160?hl=zh-Hant)
* [使用 GTM 設定強化轉換](https://support.google.com/google-ads/answer/12785317?visit_id=638151366389646302-3470424871&rd=1)
* [google tag assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk?hl=zh-tw)
