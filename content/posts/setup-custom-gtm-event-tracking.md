---
title: 'Setup Custom Gtm Event Tracking'
date: 2021-09-17T17:53:49+08:00
draft: true
author: 'whchi'
tags: ['seo']
summary: '埋了 GTM 卻不用客製化 event，履歷上敢寫你會 GTM？'
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---

# 設置 trigger
前往你的 GTM 管理平台點擊 trigger 頁籤，新增 trigger

有許多不同種類的 trigger 可以設定，這裡列舉 `url` 和 `element` 的 trigger 作為範例

{{< figure
src="/images/setup-gtm-trigger-type.png"
caption="以 link 為主，且 path 為 tags/.+">}}

{{< figure
src="/images/setup-gtm-trigger-type.png"
caption="以 element 為主，id 等於 switch_theme">}}
# 設置 tag 並綁定 trigger
{{< figure
    src="/images/setup-gtm-tag.png"
    caption="data stream 設定">}}
