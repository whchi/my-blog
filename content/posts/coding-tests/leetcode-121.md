---
title: '[Leetcode 121] Best Time to Buy and Sell Stock'
date: 2024-04-24T10:41:31+08:00
draft: true
author: 'whchi'
tags: ['coding-tests', 'leetcode']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

# 題目
給定一個整數陣列 `prices`，其中 `prices[i]` 是第 `i` 天的股票價格。如果你只能偲在一天買入股票並在之後的某一天賣出，請設計一個演算法來找到最大獲利。如果你不能獲利，則返回 `0`。
# 解法
## Time: O(n^2), Space: O(1)
最簡單的想法就是用 2 個 loop，一個參數紀錄最大利潤，另一個 loop 用來計算每一天買入股票後的最大利潤，最後回傳最大利潤。
```py
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0
        len_ = len(prices)
        for i in range(len_):
            price_in = prices[i]
            for j in range(i + 1, len_):
                profit = prices[j] - price_in
                max_profit = max(max_profit, profit)

        return max_profit if max_profit > 0 else 0
```
## Time: O(n), Space: O(1)
這個解法是用 sliding window 解，一個變數紀錄最小價格，一個變數紀錄最大利潤，遍歷整個陣列，如果當前價格比最小價格還要小，則更新最小價格，否則計算當前價格與最小價格的差值，並更新最大利潤。

```py
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        len_ = len(prices)
        price_in = prices[0]
        max_profit = 0

        for i in range(1, len_):
            profit = prices[i] - price_in
            max_profit = max(profit, max_profit)
            if price_in > prices[i]:
                price_in = prices[i]


        return max_profit if max_profit > 0 else 0
```
