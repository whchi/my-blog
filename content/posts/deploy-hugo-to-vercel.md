---
title: 'Deploy Hugo to Vercel'
date: 2023-03-22T14:55:52+08:00
draft: false
author: 'whchi'
tags: ['hugo', 'vercel']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

因為一直不想花錢買 godaddy 的 tls，所以一直是 http 的網站，最近發現 vercel 有提供免費的 tls(let's encrypt)，所以就把 blog 部署過去

# 概念
使用 github action 進行部署行為，每次 push master 時觸發部署

這裡假設你已經有一個 hugo 的專案，並且已經可以在本機端 build 成靜態網頁

# 1. 設定 vercel project

登入你的 vercel，綁定你的 hugo 專案
{{< figure
    src="https://i.imgur.com/9MaIXJP.png"
    title="vercel project"
    caption="dashboard 右上角選擇 new project">}}
{{< figure
    src="https://i.imgur.com/jxpkJ2G.png"
    title="vercel project"
    caption="找到你的 hugo 專案進行綁定">}}

# 2. 取得 vercel 設定

* 安裝 vercel
```sh
npm i -g vercel
```

* 部署
```sh
vercel
```

執行後會在目錄產生`.vercel`資料夾，裡面包含`VERCEL_PROJECT_ID`與`VERCEL_ORG_ID`，對應到 **deploy-production.yml** 的設定如下

```json
{
  "projectId": "VERCEL_PROJECT_ID",
  "orgId": "VERCEL_ORG_ID"
}
```

在 vercel 的 **個人設定->token** 取得 `VERCEL_TOKEN`
{{< figure
    src="https://i.imgur.com/IXXjhtk.png"
    title="vercel project"
    caption="輸入完 metadata 點擊 create 即建立">}}

# 3. 設定 github repo

把上一部拿到的設定都寫入 github repo 的 secret
{{< figure
    src="https://i.imgur.com/23TTbtv.png"
    title="vercel project"
    caption="Settings->Secrets and variables->Actions">}}

# 4. 設定 github action

在專案中建立`.github/workflows/deploy-production.yml`如下
```yml
name: deploy-production

on:
  push:
    branches: [ main ]

jobs:
  deploy-production:
    runs-on: ubuntu-20.04

    steps:

    - name: Checkout
      uses: actions/checkout@v2
      with:
        submodules: recursive

    - name: Start Deployment
      uses: bobheadxi/deployments@v0.4.3
      id: deployment
      with:
        step: start
        token: ${{ secrets.GITHUB_TOKEN }}
        env: Production

    - name: Install Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: '0.111.3'
        extended: true

    - name: Build
      run: hugo --gc --minify --config=config.toml

    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      id: vercel-action
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        github-comment: false
        vercel-args: '--prod'
        working-directory: .

    - name: Update Deployment Status
      uses: bobheadxi/deployments@v0.4.3
      if: always()
      with:
        step: finish
        token: ${{ secrets.GITHUB_TOKEN }}
        status: ${{ job.status }}
        deployment_id: ${{ steps.deployment.outputs.deployment_id }}
        env_url: ${{ steps.vercel-action.outputs.preview-url }}

```
記得要把 vercel 執行的 hugo build 拔掉，因為 github action 已經跑過了，不該再被 vercel CI 跑一次
{{< figure
    src="https://i.imgur.com/mMkzLAL.png"
    title="vercel project"
    caption="Project settings->General::build command 設為空值">}}

# 5. 部署
非常簡單，只要 push 到 master 就會觸發 github action，然後就會自動部署到 vercel
```sh
git push origin master
```
github CI、vercel CI 會回報錯誤，依照錯誤修正
# 6. 設定 dns
最終要的是他的 tls，vercel 依照介面設定即可
{{< figure
    src="https://i.imgur.com/HoGB70K.png"
    title="vercel project"
    caption="Project settings->Domains">}}

如果你曾經在別的地方註冊過 DNS，記得把它改寫成 vercel 提供的 A 與 CNAME，不然指錯地方就尷尬了
# references
* https://olich.me/post/building-a-personal-blog-with-hugo-and-vercel/
* [vercel dns setup](https://vercel.com/docs/concepts/projects/domains/managing-dns-records)
