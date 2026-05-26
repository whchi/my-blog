---
title: '使用 Github 管理 Docker image'
date: 2018-12-19T17:32:42+08:00
draft: false
author: 'whchi'
type: 'posts'
summary: '列出使用 github 管理 dockerhub 時需要做的步驟'
tags: ['github', 'docker']
---
Docker hub 本身有提供 autobuild trigger，只需透過UI設定與github連動即可做到使用git branch進行docker file的管理，以下分別列出Github與Docker hub需要的設定

## Github
**這裡的 branch 會對應到 Docker hub 的 tag**

1. 建立 github repo，命名為 dockerfile
2. clone 到本地後建立新的分支，命名使用自己喜歡的方式命名，e.g: `centos7-autotagging`
3. 於分支底下建立`Dockerfile`並撰寫內容
4. 寫好後`docker build . -t 'local-centos7-autotagging'` 測試 build (加上 -t 是讓 local 方便操作)
5. build通過後`git push origin centos7-autotagging`建立並推送至遠端分支

## Docker hub
**這裡的 tag 會對應到 github 的 branch**

1. 建立repo
![](https://assets.d6i.dev/blog/dockerhub-create.webp)
2. 選擇剛剛建立好的 repository，如果沒連接 github 帳號會要求進行連接
![](https://assets.d6i.dev/blog/dockerhub-choose-github-repo.webp)
3. 連接完畢並建立 repo 即可

如有設定好連動即可自動推送並建置image，結果如圖)
![](https://assets.d6i.dev/blog/dockerhub-automatic-building.webp)

之後要拉自己的環境時只需要`docker pull {username}/{repo name}:{tagname}`即可\
搭配 docker-compose 更方便，可參考我的**[範例](https://github.com/whchi/dockerfile/tree/pyml)**
