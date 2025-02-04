---
title: 'Docker Restart Policy'
date: 2025-02-04T17:47:28+08:00
draft: false
author: 'whchi'
tags: ['docker']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
toc: false
---


1. no
使用時機: 當你不希望容器在退出後自動重啟時使用。這是 Docker 的默認策略。
描述: 容器退出後不會自動重啟。
2. on-failure
使用時機: 當容器因錯誤退出（非零退出代碼）時，使用此策略來重啟容器。適合需要在錯誤情況下重啟的應用。
描述: 只有當容器因錯誤退出時才會重啟。你可以指定最大重啟次數，例如 `on-failure:5`。
3. always
使用時機: 對於需要持續運行的關鍵應用如 database，使用此策略來確保容器在任何情況下都會重啟，包括 Docker 守護進程重啟或主機重啟。
描述: 無論退出狀態如何，容器都會被重啟。
4. unless-stopped
使用時機: 當你希望容器持續運行，但在手動停止後不重啟時使用。這與 always 策略類似，但在容器被手動停止後，不會在 Docker 守護進程重啟或主機重啟時自動重啟。
描述: 容器會持續運行，除非被手動停止。在 Docker 守護進程重啟或主機重啟後，手動停止的容器不會自動重啟。
