---
title: '在 Hugo 中加入 js library'
date: 2020-12-16T19:21:15+08:00
draft: false
author: 'whchi'
tags: ['hugo']
summary: '以美人魚為例'
mermaid: true
---

善用 [shortcode](https://gohugo.io/content-management/shortcodes/) 以及 [override theme](https://bwaycer.github.io/hugo_tutorial.hugo/themes/customizing/) 的觀念即可

這裡用 [mermaid-js](https://github.com/mermaid-js/mermaid) 當範例

## step1. add short code
`layouts/shortcodes/mermaid.html`
```html
<div class="mermaid">{{ .Inner }}</div>
```
## step2. add custom theme
`layouts/partials/footer.html`
```html
...
{{ if (.Params.mermaid) }}
<script
  async
  src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.8.4/mermaid.min.js"
></script>
{{ end }}
```
## step3. add post parameter
`content/posts/xxxxx.md`
```md
mermaid: true
```
## done
{{< mermaid >}}
sequenceDiagram
    A->>B: hello
    B->>A: world
{{< /mermaid >}}
