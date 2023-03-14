---
title: '[推薦] auth 沒你想像的複雜'
date: 2022-12-25T16:12:51+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: '當我們說到 auth 時，我們究竟在說什麼'
preview_figure: ''
preview_figcaption: ''
---

# Source
https://www.youtube.com/watch?v=h6wBYWWdyYQ 21:04

# Summary
auth 的本質，很適合上補習班出來的人看
* Authentication(AuthN): 身份認證（你是誰）
* Authorization(AuthZ): 可以使用哪些權限
* AuthN flow
  1. user sign-in
  2. client(browser) stores cookie(session)
  3. rest of client's request will bring session
* AuthZ flow
  1. login user requests data
  2. server parse and check user from cookie
  3. server checks if the request action is authorized
  4. response
