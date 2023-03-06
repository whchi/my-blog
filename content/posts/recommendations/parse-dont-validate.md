---
title: "[推薦] Parse Don't Validate"
date: 2022-12-20T21:21:43+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: '輸入的階段就直接解析成正確的型態'
preview_figure: ''
preview_figcaption: ''
---

# Source
[https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)
# Summary
取得正確值的過程都會做驗證，parser 是解析成指定類型的過程報錯（做一次），validation 是檢查是否符合特定類型報錯（做 n 次），so parse, don't validate
### 文內重點
1.  the difference between validation and parsing lies almost entirely in how information is preserved
2. a parser is just a function that consumes less-structured input and produces more-structured output. By its very nature, a parser is a partial function—some values in the domain do not correspond to any value in the range—so all parsers must have some notion of failure.
3. type-hinting is the key

### 實作重點
1. Let your datatypes inform your code, don’t let your code control your datatypes

使用 type-hinting as much as you can

2. Treat functions that return `m()` with deep suspicion

任何回傳 function 的 function 都要特別謹慎看待，有可能`m()` 的主要目的是 raise exception

3. Don’t be afraid to parse data in multiple passes

input 的解析可以依賴於其他 input 的值

4. Avoid denormalized representations of data, *especially* if it’s mutable

不要亂修改 input 的值，keep single source of truth

5. Keep denormalized representations of data behind abstraction boundaries

如果必須要修改 input，就封裝一層 DTO 去負責處理

6. Use abstract datatypes to make validators “look like” parsers

如果原生的 type 無法有效驗證非法狀態時，另外定義一個 type 處理，不要硬用
