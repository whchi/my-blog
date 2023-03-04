---
title: '[推薦] Function Programing 的基礎觀念'
date: 2023-03-04T18:58:15+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: '少見的中文講解 FP 概念'
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---

# Source
[https://www.youtube.com/watch?v=qpOcRG3e9Q8](https://www.youtube.com/watch?v=qpOcRG3e9Q8) 24:22

# Summary
1. pure function 是可預測且容易測試—input 什麼 output 就會是什麼
2. pure function no side effect–不會改到外部變數（output to screen, exception, db 存取等都算）
3. Immutability 是指對 args 的不可變更性
4. avoid loops(mutation) 因為 loop 通常是對變數進行修改或 output data
5. declarative 的重點在於讓 function 成為一個 expression，而不是使用內建函數或拆小函數
