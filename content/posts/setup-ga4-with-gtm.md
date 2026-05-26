---
title: '設定 GA4 與 GTM'
date: 2021-07-08T17:35:21+08:00
draft: false
author: 'whchi'
tags: ['seo']
summary: '寫了 blog 總會想看一下瀏覽數，娛不了人也能自娛'
preview_figure: 'https://assets.d6i.dev/blog/preview/docking.webp'
preview_figcaption: '每個搞網站的工程師都要會一點 ga + gtm'
preview_image: 'https://assets.d6i.dev/blog/preview/docking.webp'
---
# Google Analytics(GA)
## 1. 建立 account 與 property
property 建議設定成 hostname

## 2. 建立 data stream
照表填寫
{{< figure
    src="https://assets.d6i.dev/blog/ga-data-stream.webp"
    caption="data stream 設定">}}

## 3. copy measurement id
{{< figure
    src="https://assets.d6i.dev/blog/ga-copy-measurement-id.webp"
    caption="copy measurement id">}}

# Google Tag Manager(GTM)
## 1. 建立 account 與 container
container 建議設定成 hostname

## 2. 建立 tag
{{< figure
    src="https://assets.d6i.dev/blog/gtm-setup-ga4-tag.webp"
    caption="選擇 GA4 configuration，貼上剛剛複製的 measurement id">}}
## 3. 貼代碼到你的 site
{{< figure
    src="https://assets.d6i.dev/blog/gtm-code.webp"
    caption="代碼示意圖">}}
## 4. 驗證結果
{{< figure
    src="https://assets.d6i.dev/blog/gtm-preview-tag-1.webp"
    caption="點選 preview 前往驗證">}}
{{< figure
    src="https://assets.d6i.dev/blog/gtm-preview-tag-2.webp"
    caption="設定網站位置進行驗證">}}
{{< figure
    src="https://assets.d6i.dev/blog/gtm-preview-tag-site.webp"
    caption="驗證結果-site（需裝套件）">}}
{{< figure
    src="https://assets.d6i.dev/blog/gtm-preview-tag-dashboard.webp"
    caption="驗證結果-dashboard">}}


然後你就可以跟一般 GA 一樣在後台看到 GA 結果拉～

# 補充
## GTM vs GA
1. GTM 不是拿來取代 GA 的，他是讓建立 GA tracking code （tag）設定規則、獨立 trigger 更加方便
2. GTM 是個介於你的網站與 tracking code management 的 middle man，不同的網站需要埋的 event 都可以透過它進行管理
3. 同上，GTM 獨立於 GA 之外，GA 只是眾多 tag 的其中一種，此外你也可以透過 GTM 對 GA 增修進行管理而不需要透過工程師做處理（太過客製化除外）
4. GTM 可以在特殊情況下觸發特定 event，GA 僅是一個全站分析的 tag，比如說：註冊表單送出事件、使用者收藏某篇文章..等
5. GTM 不能設定 GA goal/conversions

## GA4 vs old GA(universal analytics)
1. measuring model：GA4 based on events and params, old GA based on sessions and pageviews
2. 免費版取消每月點擊限制：old GA 10m/month, GA4 unlimited
3. GA4 可以免費與 BigQuery 進行串接

## 放到 hugo 裡面
善用 [shortcode](https://gohugo.io/content-management/shortcodes/) 功能，建立一個 `tracking.html` 埋 GTM

於放置的地方加入判斷
```go
{{ if (fileExists "layouts/partials/tracking.html") }}
{{ partial "tracking.html" . }}
{{ end }}
```

## References
* https://www.analyticsmania.com/post/google-tag-manager-vs-google-analytics/
* https://www.adaptworldwide.com/insights/2021/google-analytics-4-vs-universal-analytics-whats-the-difference
