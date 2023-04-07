---
title: '發布 npm 套件'
date: 2023-04-07T10:43:59+08:00
draft: false
author: 'whchi'
tags: ['nodejs', 'npm']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

記錄一下，關鍵在於打包的 folder 路徑

# package.json
可以使用 `npm init --scope=@your-name` 建立或直接修改原本的 `pacakge.json` 的 name，要注意 name 在 npm 上面必須是唯一的
{{< table "table table-bordered table-hover" >}}
| key     | description                                                              |
| ------- | ------------------------------------------------------------------------ |
| name    | 套件名稱，如為 scoped 就使用`@your-name` 開頭                            |
| type    | 為 `module` 表示為 esm，導出的 .js 才能被 es6 語法 import，否則要用 .mjs |
| main    | package 進入點                                                           |
| exports | 這裡表明了使用 esm 或 cjs 時對應的檔案                                   |
| files   | 安裝的檔案                                                               |
{{</ table >}}
```json
{
    "name": "@your-name/package-name",
    "license": "MIT",
    "version": "0.0.1",
    "description": "package description",
    "type": "module",
    "scripts": {
        // ...
    },
    "devDependencies": {
        // ...
    },
    "dependencies": {
        // ...
    },
    "files": [
        "/dist/components/",
        "/dist/hooks/",
        "/dist/types/",
        "/dist/index.d.ts",
        "/dist/index.js"
    ],
    "main": "dist/index.js",
    "exports": {
        ".": {
            "import": "./dist/index.js",
            "require": "./dist/index.umd.cjs"
        }
    }
}

```
exports 的設定有其對應的打包工具會吃（tsup, unbuild），假如使用 vite 的話此設定無效，因為是透過 vite 設定打包，如需修改打包結果可修改`build.lib` 參數
```ts
export default defineConfig({
    build: {
      lib: {
        entry: path.resolve(root, 'index.ts'),
        // 預設會建立 es(import) 與 umd(require)
        // format: ['es', 'umd', 'amd', 'cjs']
        name: 'index',
        fileName: 'index',
      },
    },
  };
});
```
關於 4 種 module 的異同可參考我的[這篇文章](/2023/04/node-module-comparison/)

# publish
1. 註冊 npmjs.org 帳號
2. local 登入
```shell
npm login
```
3.發布套件
```shell
# 發布公開套件
npm publish --access public
# 發布私有套件（付費帳戶）
npm publish
```
