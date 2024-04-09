---
title: '[推薦] 10 Things I Learned From the jQuery Source'
date: 2024-04-09T23:27:56+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---
很久之前的影片，但是還是有一些值得學習的地方。

雖然標題是 10 things 但影片中並沒有列出 10 個
# Source
https://www.youtube.com/watch?v=i_qE1iAmjFg 53:39

# Summary

1. 使用 IIFE 避免變數污染
```js
// 其中有用以下幾個技巧
// 1. 把 window, window.document 傳入可以在內部以方便遍歷
// 2. undefined 傳入確保 undefined 是真的 undefined
(function(window, document, undefined) {
    // ...
}(this, document));
```
2. async IIFE self invoking function
```js
// 可以確保每次的 setInterval 都是在上一次執行完成之後
setInterval(function() {
    doStuff();
}, 100);
// 改寫成
(function() {
    doStuff();
    setTimeout(arguments.callee, 100 );
}());
```
3. ready 方法處理了所有瀏覽器的 DOM loaded event
4. `getScript` 作為一個 script loader 的意圖且可以處理 callback 的設計方式
5. Duck punching 的技巧
```js
// Animal with a generic makeSound method
const animal = {
  makeSound() {
    console.log("Generic animal sound!");
  }
};

// Duck punching a Dog instance to have a specific sound
const dog = Object.create(animal); // Inherit from animal
dog.makeSound = function() {
  console.log("Woof!");
};

animal.makeSound();  // Generic animal sound!
dog.makeSound();     // Woof!
```
