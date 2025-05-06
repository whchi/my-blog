---
title: '使用 Burp Suite 進行封包竄改'
date: 2021-08-26T12:41:03+08:00
draft: false
author: 'whchi'
tags: ['security']
summary: '改封包 94 這麼簡單'
preview_figure: '/images/preview/what-are-you-looking-at.webp'
preview_figcaption: "I'm watching you"
preview_image: '/images/preview/what-are-you-looking-at.webp'
---

很久以前用過，紀錄一下怎麼做竄改封包找漏洞

OWASP ZAP 也可以做到

# local env
1. 關閉 proxy 攔截
{{< figure
    src="/images/burp-suite-setup-1.webp"
    title="close proxy intercept"
    caption="確認攔截器已關閉">}}
2. 確認 proxy port 並設定為 loopback
{{< figure
    src="/images/burp-suite-setup-2.webp"
    title="setup proxy"
    caption="確認 proxy 設定正確">}}
3. 設定 browser proxy
{{< figure
    src="/images/burp-suite-setup-3.webp"
    title="setup browser proxy"
    caption="在瀏覽器的設定直接改">}}
4. 進行攔截
{{< figure
    src="/images/burp-suite-setup-4.webp"
    title="start intercept"
    caption="">}}
# other env
1. 透過 burp suite 開啟瀏覽器輸入要攔截的網址
{{< figure
    src="/images/burp-suite-setup-5.webp"
    title=""
    caption="點擊 open browser">}}
2. 進行攔截
{{< figure
    src="/images/burp-suite-setup-6.webp"
    title="系統架構"
    caption="Cloud CDN 獨立於 GKE 之外">}}

## 針對 request 竄改封包
每按一次 forward 就會讓網站繼續往下個 request跑

{{< figure
    src="/images/burp-suite-tamper-1.webp"
    title="tamper response"
    caption="跑到要竄改的 request 時針對回應進行竄改">}}

{{< figure
    src="/images/burp-suite-tamper-2.webp"
    title="tamper response"
    caption="竄改完畢後按 forward 即可">}}
