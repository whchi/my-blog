---
title: '[推薦] Mock Database or Not'
date: 2022-06-06T16:14:40+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: 'mock is a good thing'
preview_figure: ''
preview_figcaption: ''
---
最近比較閒，想開啟一個逼自己閱讀的方式：找出個人認為值得閱讀的文章，做出重點摘要，順便嘗試看看[原子習慣](https://www.books.com.tw/products/0010822522)的法則。

結構會由 source、summary以及 main idea 組成方便閱讀與回顧。

靈感來源是 [灣區日報](https://wanqu.co/)，能持續多久就是多久，作為終身學習的一個表徵～
# Source
https://vkhorikov.medium.com/dont-mock-your-database-it-s-an-implementation-detail-8f1b527c78be
# Summary
mock 的本質是在撰寫測試時模擬無法控制的服務或以產出為主的類別，比如 SMTP、金流、queue、command 等， 其他可控的服務或獲取為主的類別如 database、shopping cart、query 等應使用 stub 進行測試撰寫。在撰寫程式時考慮物件本身是屬於 inter 或 intra level 的 service，搭配 DI 模式可以更好地寫出 testable 的程式。
# Main idea
在撰寫測試時經常會需要模擬假物件（mock）或假資料（stub），stub 比較容易理解，mock 則需釐清場景。本文首先提出撰寫測試時進行模擬的名詞提出解釋，分別是

0. test double: 在撰寫測試時假物件/假資料的總稱
1. mock: 完整物件，通常由 framework 中包含的 library 提供
2. spy: 部份物件，與 mock 相同，通常需自行實作
3. dummy: 完全寫死的假資料
4. stub: 比 dummy 更加完整的假資料，會因 input 變更 output
5. fake: 同 stub，差別在於尚未實作

再依 outcoming/incoming，command/query，inter/intra的角度分別解釋 mock  與 stub 的差異，最後依 dependency 的角度總結出該使用 mock 的情境
