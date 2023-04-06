---
title: 'node module 比較'
date: 2023-04-06T15:12:24+08:00
draft: false
author: 'whchi'
tags: ['nodejs']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

There are 4 types of node modules:
1. CommonJS(cjs)
2. ES6(esm)
3. Asynchronous Module Definition(amd)
4. Universal Module Definition(umd)

Here's a comparison of the 4 types of modules using ChatGPT-4.

{{< table "table table-bordered" >}}
| Feature                | umd                                     | cjs                                      | esm                                      | amd                                       |
| ---------------------- | --------------------------------------- | ---------------------------------------- | ---------------------------------------- | ----------------------------------------- |
| Purpose                | Universal module format                 | Server-side module format                | JavaScript standard module format        | Asynchronous module format                |
| Supported environments | Browser and Node.js                     | Node.js                                  | Modern browsers and Node.js (>= 13)      | Browser                                   |
| Syntax                 | Defines a factory function              | Uses `require` and `module.exports`      | Uses `import` and `export`               | Uses `define` and `require`               |
| Dynamic import         | No                                      | No                                       | Yes                                      | Yes                                       |
| Asynchronous loading   | No                                      | No                                       | Yes                                      | Yes                                       |
| Tree shaking           | No                                      | No                                       | Yes                                      | No                                        |
| Dead code elimination  | No                                      | No                                       | Yes                                      | No                                        |
| Native support         | No                                      | Yes (in Node.js)                         | Yes (in modern browsers and Node.js)     | No                                        |
| Interoperability       | High (works with AMD, CJS, and globals) | Medium (works with ESM using `import()`) | Medium (works with CJS using `import()`) | Low (mainly works with other AMD modules) |
| Performance            | Medium                                  | Medium                                   | High                                     | Medium                                    |
| Usage complexity       | Medium                                  | Low                                      | Low                                      | Medium                                    |
| Popularity             | Medium                                  | High                                     | Growing popularity                       | Declining popularity                      |

{{</ table >}}
