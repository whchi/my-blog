---
title: '安裝 fork 過來的 composer 套件'
date: 2019-06-02T20:16:20+08:00
draft: false
author: 'whchi'
type: 'posts'
tags: ['composer', 'php']
summary: '人在做，天沒在看'
---
前陣子遇到使用的套件有相依套件的衝突，發 PR 套件原作者發現上次更新時間是 500 年前，所以就研究了一下怎麼只裝自己 fork 的版本

設定如下

* composer.json
```json
{
    ...
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/{yourname}/package"
        }
    ],
    "require": {
        "vendor/package": "dev-{your fork branch name}"
    }
}
```
> 建議 branch name 切開，不要用 master
## Reference
* https://getcomposer.org/doc/05-repositories.md#vcs
