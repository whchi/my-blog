---
title: '智能合約開發學習—資料型別與控制流程'
date: 2023-03-18T16:21:47+08:00
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
* solidity basics（Data types & Control flow）
* [functions](/2023/03/smart-contract-development-3)
* [實踐 ERC 20](/2023/03/smart-contract-development-4)

# storage detail
在 EVM 中有三個地方儲存變數
1. storage
   1. holds state variables
   2. persistent and expensive(cost gas)
   3. like HDD
2. memory
   1. local variables with `memory` keyword
   2. like RAM
   3. free to be used
   4. holds function args
3. stack
   1. hold local variables inside functions if they are not reference types(e.g: int)
   2. free to be used
   3. reference types: `string`, `array`, `struct`, `mapping`

# variables
solidity 的變數大致上分以下兩種
1. state(global) variable: declare at contract level
   1. store in contract storage
   2. can be constant
   3. cost gas to declare
   4. set by init, construct or setter
2. local variable: declare at function level
   1. can allocate at runtime(use `memory` keyword and in `array` or `struct` data types)
   2. `string` default saves in storage, use `memory` if you want `string` be local variable

# variable types
## boolean
```sol
bool myBoolean = true;
```

## int and uint
有 uint8,uint16,uint32...uint256，如果都不指定預設是 uint256
```sol
int noAssign; // int256 noAssign = 0
uint256 myUnsignedInt = 42;
int256 mySignedInt = -42;
```

## address
20-byte 的 eth address
```sol
address myAddress = 0x1234567890123456789012345678901234567890;
```
## bytes
array of byte，alias of byte[]
```sol
bytes myBytes = "1234567890abcdef";
byte[] sameMyBytes = "1234567890abcdef";
```

## string
```sol
string myString = "Hello, World!";
```

## enum
```sol
enum State {
    Open,
    Closed,
    Unknown
}

State xxx = State.Open;
```

## struct
自定義的 key-value 結構，通常用來定義單數的物件
```sol
struct Person {
    string name;
    uint age;
}

Person myStruct;
myStruct.name = "Jon Doe";
myStruct.age = 18;
// or
Person myStruct = Person("Jon Doe", 18);
```

## mapping
自定義的 key-value 結構，通常用來定義複數的物件
* not iterable(key is hash and not saved into mapping)
* key 不可以是 `mapping`, `array`, `enum` or `struct`
* 如果對不存在的 key 進行存取的話，會取得 value 變數的預設值
```sol
mapping (uint256 => string) myMapping;
myMapping[0] = "Hello";
myMapping[1] = "World";
```

## array
* fixed-size(compile time)
```sol
uint[3] numbers = [2, 3, 4];
```
* dynamic-size(runtime)
```sol
uint[] numbers;
byte[] byteNums;
```
# 能見度（visibility）
變數與 function 都有能見度，宣告在 contract level，共有 4 個層級
* public
  * 可在同個 contract 中被呼叫或是被其他 account 呼叫
  * variable 預設會建立對應的 getter
* private
  * internal 的子集
  * state variable 的預設能見度
  * 只活在該 contract 中
* internal
  * 有點類似 protected, 活在 contract 本身與繼承的 contract
* external
  * 可視為 contract 的 interface，只能被其他 contract 或是 EOA 呼叫
  * not available for state variables

實際撰寫時的語法如下
```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

contract MyContract {
    // <variable type> <visibility> <variable name>;
    uint public myNum;
    // function <function name>(<variable type> <variable name>) <visibility> {}
    function addNum(uint _myNum) public {
        myNum += _myNum;
    }
}
```

# global variable
預設的全域變數，比較常用的有
* msg: 如專有名詞那裡提到，CA 會產生 message，只的就是這個 msg
  * msg.sender: account address of tx maker
  * msg.value: eth value (in wei) sent to this contract
  * msg.gas: remaining gas(will be replaced by gasleft())
  * msg.data: data field from tx or called this function's data
* gasleft(): remain gas of this transaction, can calculate a function's gas
* this: the current contract, e.g: address(this).balance => this contract's balance
* block: the block itself
  * block.timestmap: alias of now, unix epoch
* tx.gasprice: gas price of the transaction
# references
* [solidity global variables](https://docs.soliditylang.org/en/v0.8.17/units-and-global-variables.html)
