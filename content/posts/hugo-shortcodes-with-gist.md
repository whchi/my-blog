---
title: "Hugo shortcodes With embed gist"
date: 2018-12-29T18:24:20+08:00
draft: true
author: 'whchi'
tags: ['hugo', 'gist']
summary: 'embed gist'
---

1. create `layouts/shortcodes` folder if not exists
2. add gist.html and past follow code below
{{< gist ce8cfd2061f7bba1635790f45c149f92 >}}

then you can use it in your .md file by **\{\{< gist embedhash >\}\}**

## Reference
* http://blog.cronally.com/embed-gists-with-hugo/
