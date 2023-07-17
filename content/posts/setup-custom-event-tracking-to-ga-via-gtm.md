---
title: '透過 GTM 綁定客製事件到 GA4'
date: 2021-09-17T17:53:49+08:00
draft: false
author: 'whchi'
tags: ['seo']
summary: '埋了 GTM 卻不用客製化 event，履歷上敢寫你會 GTM？'
preview_figure: ''
preview_figcaption: ''

---

# 設置 trigger
前往你的 GTM 管理平台點擊 trigger 頁籤，新增 trigger

有許多不同種類的 trigger 可以設定，這裡列舉 click 事件的 `url` 和 `element` 的 trigger 作為範例

{{< figure
src="/images/setup-gtm-trigger-type.webp"
caption="以 link 為主，且 path 為 tags/.+">}}

{{< figure
src="/images/setup-gtm-trigger-type-1.webp"
caption="以 element 為主，id 等於 switch_theme">}}

此外還有 page view、user engagement 以及其他還無法歸納的類型可以使用，可依照自己的需求決定要埋設的類型 trigger
# 設置 tag 並綁定 trigger
{{< figure
    src="/images/setup-gtm-tag.webp"
    caption="新增 tag 綁定 trigger">}}
1. tag type 選擇 **GA4 Event**
2. Configuration Tag 選擇 **Google Analytics GA4 Configuration**
3. 定義要顯示到 GA console 的 event_name
4. 綁定對應的 trigger

設定完畢後先 preview，確定有效果再 submit（做版控）
# 檢驗結果
前往 GA console，過一段時間在 **Engagement::Events** 畫面就能看到自訂義事件的結果摟
{{< figure
    src="/images/setup-gtm-event-result-review.webp"
    caption="額外設定的 switch_theme 事件呈現在 console 上">}}
## 補充
regex 不熟悉的話可以到 [https://regex101.com/](https://regex101.com/) 或是 [https://ihateregex.io/](https://ihateregex.io/) 先找到 pattern，再貼回來
