---
title: '設定 Nas 對外的 WebDAV 服務'
date: 2025-01-09T17:10:51+08:00
draft: false
author: 'whchi'
tags: ['']
summary: 'cloudflare 是你永遠的好朋友'
preview_figure: ''
preview_figcaption: ''
preview_image: ''
toc: false
---

因為工作需要，要架設 NAS 上的 WebDAV 伺服器，讓外部可以存取。

這邊使用 Synology NAS DS124 作為範例，並且透過 Cloudflare tunnel 給予對外 domain 與 HTTPS。

這篇文章專注在設定 NAS 上的 WebDAV 伺服器。

# Cloudfare Tunnel 設定
這裡 tunnel 都已經設定好了，只有 ip 位置需要注意必須要指向你的 NAS 內部 IP。
{{< figure src="https://i.imgur.com/lDjKFtO.png" title="cloudflare tunnel 設定" caption="cloudflare tunnel 設定" >}}
記得要複製你的 tunnel token，以下是一個 docker-compose 的範例
```yaml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=<YOUR_TUNNEL_TOKEN>
    restart: unless-stopped
```
# Synology NAS 設定
## WebDAV 伺服器設定

{{< figure src="https://i.imgur.com/X1ZPwgy.png"
           title="安裝 WebDAV Server"
           caption="點開 package center，搜尋 WebDAV Sever 並安裝" >}}
{{< figure src="https://i.imgur.com/dTAgaYn.png"
           title="WebDAV Server 設定"
           caption="啟用 http 即可" >}}

## Container Manager 設定

{{< figure src="https://i.imgur.com/lhBfsGX.png"
           title="安裝 Container manager"
           caption="點開 package center，搜尋 Container Manager 並安裝" >}}
接著打開 Container Manager，到 registry 上 cloudflared image
{{< figure src="https://i.imgur.com/BPHDrEJ.png"
           title="下載 cloudflared image"
           caption="cloudflare/cloudflared 安裝" >}}
裝好之後到 File Station 的 docker 資料夾底下建立一個給 cloudflared image 用的資料夾，這裡我建立 `cloudflare-tunnel`
{{< figure src="https://i.imgur.com/rZfrVjR.png"
           title="建立 cloudflare-tunnel 資料夾"
           caption="建立 cloudflare-tunnel 資料夾" >}}
然後回到 Container Manager，從 Project 頁面新增一個新的專案，選取剛剛建立的資料夾撰寫 docker-compose.yml
{{< figure src="https://i.imgur.com/sbH9jgN.png"
              title="新增專案"
              caption="新增專案與 docker-compose.yml" >}}

設定完成後啟用它，然後你就可以獲得一個對外的 NAS 服務了。
{{< figure src="https://i.imgur.com/y4gMI5u.png"
                title="啟用專案"
                caption="啟用專案" >}}
