---
title: '智能合約開發學習—functions'
date: 2023-03-18T17:21:47+08:00
draft: false
author: 'whchi'
tags: ['solidity', 'blockchain', 'eth']
summary: ''
preview_figure: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=60'
preview_figcaption: ''
preview_image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=20'
---

這裡整理之前上課的筆記，都是入門級別一共 4 章，分別如下：
* [專有名詞（Terms）](/2023/03/smart-contract-development-1)
* [solidity basics（Data types & Control flow）](/2023/03/smart-contract-development-2)
* functions
* [實踐 ERC-20](/2023/03/smart-contract-development-4)

function 的寫法跟一般的程式語言一樣，特別拉一個章節是因為有多個 function type

# 語法
```sol
function <name>(<params>) <visibility> [modifier] <function type> returns(<return type>) {
		// statements
}
```
return type 就是 variable type，比如 `int`、`array` ...
## function type
function type 大致上可以分為 4 種
### 1. view function
readonly function，不會修改任何的 state
```sol
function example(int num) public view returns(int){}
```
### 2. pure function
no read and modify state，作爲 helper function 使用（運算或是字串操作）

可以被外部呼叫，不消耗 gas
```sol
function example(int numa, int numb) public pure returns(int) {}
```

### 3. payable function
可以用來收 eth 的 function

```sol
function example(int incoming) public payable {}
```

### 4. special function
* fallback function

定義了 contract 的預設行為：當不使用該 contract 定義的 function 呼叫時執行，因此必為 external

也可以設定為 payable 來接收 eth

```sol
fallback() external payable {}

fallback() external {
    require(msg.sender == msg.receiver)
}
```

* receive function

必須是 external payable，可以不用指定參數就接收 eth，與 payable 差在 sender 不需要知道你的 api 參數，直接送就好
```sol
receive() external payable {}
```

# function modifier
* 修改 function 行為的 helper function
* 發生 function 的最上方，使用`modifier`關鍵字宣告
* 用來把重複的驗證行為包裹起來讓 code 好讀
* 只能寫`require`

```sol
modifier onlyOwner() {
    require(owner == msg.sender);
    _; // if pass then execute else is throw exception
}
function xxx() public onlyOwner {
    // require(owner == msg.sender);
    xxxx
}
```

# event
寫 log 用的，告訴真實世界這個 contract 發生了什麼事，比如發生 transfer、發生 approve 等
```sol
event Transfer(address indexed from, address indexed to, uint tokens);

emit Transfer(msg.sender, msg.receiver, 10)
```
