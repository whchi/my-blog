---
title: '[推薦] 什麼是 PID 0'
date: 2024-06-09T12:17:56+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---

# Source
https://blog.dave.tf/post/linux-pid0/

# Summary

1. PID 0 的功能：在 Unix 系統中，PID 0 啟動內核，隨後協助進程調度和電源管理，但通過傳統 API 不向使用者顯示。

2. 網絡上的錯誤信息：關於 PID 0 的大量錯誤信息主要源於 16 年前維基百科上的一段誤導性陳述。這些錯誤信息廣泛傳播，影響了許多來源。

3. 常見的誤解：許多來源錯誤地認為 PID 0 參與分頁、交換空間或其他內存管理任務。實際上，PID 0 不處理這些功能。

4. 歷史背景：PID 0 的角色從早期 Unix 版本中作為調度的一部分處理一些內存管理任務，發展到現代內核中專注於調度和電源管理，在空閒時使 CPU 內核進入休眠狀態。

5. 關於 PID 0 的澄清：在現代 Unix 系統中，PID 0（也稱為空閒任務）在沒有其他任務調度時運行，其主要角色是維護 CPU 空閒狀態。不同 CPU 內核上的所有空閒任務共享相同的 PID 0 標識。
