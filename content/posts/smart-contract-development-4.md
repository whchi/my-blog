---
title: '智能合約開發學習—實踐 ERC 20'
date: 2023-03-18T17:30:47+08:00
draft: true
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
* [functions](/2023/03/smart-contract-development-3)
* 實踐 ERC-20

講那麼多，還是看個實際的例子比較有感覺

所謂得 ERC 是 Ethereum Request for Comments 的縮寫，是被同意後的 EIP 演變而來的

EIP 是 Ethereum Improvement Proposals 的縮寫，顧名思義就是提案，提案給 eth 社群經審查確定實作後就成為 ERC

而 EIP-20 的標題是 Token standard，就是以太幣的標準


# interfaces
EIP-20 的文件有明定要實現標準接口如下
* totalSupply
* balanceOf
* transfer
* transferFrom
* approve
* allowance
# implementation
* 開發環境

這裡是用 Remix IDE 進行開發，不用煩惱本地環境配置的問題

# references
* [EIP-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* [Remix IDE](https://remix.ethereum.org/)
