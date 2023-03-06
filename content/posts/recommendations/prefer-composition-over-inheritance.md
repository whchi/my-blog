---
title: '[推薦]少用繼承，多用 composition'
date: 2023-01-08T11:13:34+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source
[https://www.youtube.com/watch?v=hxGOiiR9ZKg](https://www.youtube.com/watch?v=hxGOiiR9ZKg)
# Summary
Inheritance's cost is expensive when changing requirement, and will need to write methods which your subclass doesn't needs. Use composition to write more usable code.

{{< table "table table-bordered table-hover">}}
|             | re-use    | abstraction  |
| :---------: | :-------- | :----------- |
| inheritance | extending | parent class |
| composition | using     | interface    |
{{< /table >}}

Unlike extending parent class, interfaces defines only the critical part of the contract, it's coupling the codes and is adaptable with new requirements.

