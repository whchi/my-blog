---
title: '如何在 Vitejs 中使用 process.env'
date: 2023-04-06T19:03:30+08:00
draft: false
author: 'whchi'
tags: ['nodejs']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

process 是在 nodejs 的執行環境下才能使用的 global object，因此當在 browser 的環境下不能正常調用 process

而打包工具如 webpack, vite 都能夠幫我們做到這點，原因是他們在執行時會先將自訂義的 process 變數處理後再 render 給 browser 讀取

vite 是使用 **vite-plugin-env-compatible** 搭配 **@rollup/plugin-replace** 來進行撈取與替換達成的

根據官網文件，只要在`.env`檔案中設定好`VITE_*`的環境變數都能夠透過`import.meta.env`來取得，但當開發套件時不應該讓套件使用者在定義環境變數時加上`VITE_*`，所以我們需要把我們的環境變數轉換成`process.env`的形式讓使用時彈性更好

實際執行參考以下範例

* vite.config.js
```js
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.YOUR_STRING_VARIABLE': JSON.stringify(env.YOUR_STRING_VARIABLE)),
            'process.env.YOUR_BOOLEAN_VARIABLE': env.YOUR_BOOLEAN_VARIABLE,
            // If you want to exposes all env variables, which is not recommended
            // 'process.env': env
        },
    };
});
```
* .env

```.env
YOUR_STRING_VARIABLE="helloworld"
YOUR_BOOLEAN_VARIABLE=false
```
# references
* https://vitejs.dev/config/
