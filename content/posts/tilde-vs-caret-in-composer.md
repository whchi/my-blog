---
title: 'Tilde(~) vs Caret(^) in composer'
date: 2021-08-05T18:15:54+08:00
draft: false
author: 'whchi'
tags: ['composer']
summary: '^ vs ~'
preview_figure: ''
preview_figcaption: ''
---
在 `composer.json` 經常看到 caret(^) 跟 tilde(~) 開頭的套件版號，雖然很少會遇到需要調整的情況但有需要都會忘記，紀錄一下不然每次都要查

# 先講結論
1. **Always use caret(^) instead of tilde(~)**
2. **`npm` is in the same rule**

# 細節
## 一般情況
```sh
# ~
~1.0   means >=1.0.0 <2.0.0 same as 1.*
~1.0.0 means >=1.0.0 <1.1.0 same as 1.0.*
# ^
^1.0   means >=1.0.0 <2.0.0 same as 1.*
^1.0.0 means >=1.0.0 <2.0.0 same as 1.*
```
## 特殊情況
版號為 `0.y.z` 的狀況：依照語意化版號的標準，在 `0.y.z` 時都算是 under development，不應被視為 stable
```sh
# Might break backward compatibility
~0.2 means >=0.2.0 <1.0.0
# This is fine
~1.2 means >=1.2.0 <2.0.0
# workaround
0.2.* means >=0.2.0 <0.3.0

# Solve it in simple way
^0.2 means >=0.2.0 <0.3.0
```
# Reference
* [composer version constraints](https://getcomposer.org/doc/articles/versions.md#writing-version-constraints)
* [semver](https://semver.org/)
