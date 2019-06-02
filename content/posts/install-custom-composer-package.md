---
title: 'Install Custom Composer Package'
date: 2019-06-02T20:16:20+08:00
draft: false
author: 'whchi'
tags: ['composer', 'php']
summary: '人在做，天沒在看'
---
前陣子遇到使用的套件有相依套件的衝突，發 PR 套件原作者發現上次更新時間是 500 年前，所以就研究了一下怎麼只裝自己 fork 的版本

設定如下
* composer.json
{{< highlight json >}}
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
{{< / highlight >}}

## Reference
* https://getcomposer.org/doc/05-repositories.md#vcs
