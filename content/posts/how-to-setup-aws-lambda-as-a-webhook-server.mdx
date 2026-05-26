---
title: '把 AWS lambda 設定成 webhook server'
date: 2023-04-20T14:51:01+08:00
draft: false
author: 'whchi'
tags: ['aws']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Summary
設定 AWS Lambda 綁定 IAM 到 EC2 上，搭配 NAT Gateway 來讓該 Lambda 可以連線到外部網路。

## 前言
webhook 是一種傳遞資料的實作方式，通常只有露出特定的端點（通常只有一個）讓搭配 CORS 設定讓外界可以打他進行資料傳遞，當要對他做 rate limit 的時候就需要有 storage 來記錄必要資訊

本文使用 elasticache 當作 storage 來記錄設定流程
## 設定流程
1. 建立 IAM Role 並給予 `AWSLambdaVPCAccessExecutionRole` 全線
2. 建立 elasticache cluster
3. 建立 lambda function 並綁定到該 IAM Role（要開啟 CORS）
4. 綁定 lambda 的 subnet 與 security group 到該 IAM Role
5. 建立 NAT Gateway 並將其綁定到該 lambda function 的 subnet

官網文件寫得很清楚，詳細步驟參考以 references
## references
* https://docs.aws.amazon.com/zh_tw/lambda/latest/dg/services-elasticache-tutorial.html
* https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/Lambda.html
* https://docs.aws.amazon.com/lambda/latest/dg/services-elasticache-tutorial.html
* https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/
