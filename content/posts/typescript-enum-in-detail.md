---
title: 'Typescript Enum 的使用時機'
date: 2023-05-26T10:35:28+08:00
draft: false
author: 'whchi'
tags: ['typescript']
summary: ''
preview_figure: ''
preview_figcaption: ''
mermaid: true
---

enum 是常見的一種資料型態，字面意義就是一個 key-value(int) 的配對，在 typescript 中使用有些細節需要注意

# 結論
{{< mermaid >}}
graph LR
    A{need reverse mapping?}
    A --> |T| B{normal enum?}
    A --> |F| H[you don't need enum]
    B --> |T| C[use `enum`]
    B --> |F| D{loop through enum?}
    D --> |T| E[use `const assertion`]
    D --> |F| G[use `const enum`]
{{< /mermaid >}}
# 內文
首先，我們先來看一個簡單的例子
```
// original
export enum ToDoStatus {
    OK = 200,
    IceBox = 400,
    Backlog = 500,
}
// after build
export var ToDoStatus;
(function (ToDoStatus) {
    ToDoStatus[ToDoStatus["Ok"] = 200] = "Ok";
    ToDoStatus[ToDoStatus["IceBox"] = 400] = "IceBox";
    ToDoStatus[ToDoStatus["Backlog"] = 500] = "Backlog";
})(ToDoStatus || (ToDoStatus = {}));
// {200: 'Ok', 400: 'IceBox', 500: 'Backlog', Ok: 200, IceBox: 400, Backlog: 500}
```
可以看到 build 後的程式碼，會有一個反向的 mapping，這是因為 typescript 的 enum 有 reverse mapping 的功能，也就是說，我們可以從 value 取得 key，這樣會使得最終 size 變大

同時字串的 enum 在編譯後結果是無法 reverse mapping 的
```
// original
enum ApiResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  FAIL = 'fail',
}
// build
var ApiResponseStatus;
(function(ApiResponseStatus) {
    ApiResponseStatus[
    "SUCCESS"] = "success";
    ApiResponseStatus["ERROR"] = "error";
    ApiResponseStatus["FAIL"] = "fail";
})(ApiResponseStatus || (ApiResponseStatus = {}));
// {SUCCESS: 'success', ERROR: 'error', FAIL: 'fail'}
```

有 2 種方法可以減少 build 後的程式碼大小
## 1. const assertion
```
// original
export const httpStatusCode = {
    Ok: 200,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    ServerError: 500,
} as const;
// build
export const httpStatusCode = {
    Ok: 200,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    ServerError: 500,
};
```
## 2. const enum
```
// original
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
// build
// empty, you are right, it's empty, only when you use it, it will be replaced

let directions = [
    0,
    1,
    2,
    3,
];
```
在使用時的考慮為
1. 是否需要 reverse mapping
2. 需要，內容為一般的 enum(integer value)，use `enum`
3. 需要，但是不需要 loop through enum，use `const enum`
4. 需要，且需要 loop through enum，use `const assertion`

# References
* https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
* https://www.typescriptlang.org/docs/handbook/enums.html#const-enums
* https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
