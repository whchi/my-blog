---
title: '[推薦] Intro to Aws-The Most Important Services To Learn'
date: 2023-10-08T12:57:47+08:00
draft: false
author: 'whchi'
tags: ['recommendation', 'aws']
summary: '介紹了近 40 個 AWS 服務與其對應的位置，提供了一個學習路徑。'
preview_figure: ''
preview_figcaption: ''
---

# Source
https://www.youtube.com/watch?v=FDEpdNdFglI 50:06

# Summary
- DNS
  - route53
- LBS
  - ELB
- IAM: 管理整個 AWS 服務的資源與權限的服務
- CDN
  - CloudFront
- web/application service
  - EC2
  - lambda(serverless)
  - ECS(docker container manager)
- database
  - Elasti Cache(redis or memcache)
  - RDBMS
    - aurora: MySQL or PostgreSQL 處理好 scaling, 不支援 serverless
    - RDS: 可以選擇不同的 RDBMS
  - NoSQL
    - DynamoDB: support autoscaling
    - DocumentDB: MongoDB
    - OpenSearch: ElasticSearch like service, query 彈性高
- Packaged infrastructure
  - Elastic Beanstalk: 包含 backend, lbs, db, monitoring, autoscalingApp
  - App runner: use ECS behind the scene
  - Light Sail: 類似 Digital Ocean 的服務，提供可選擇的 tech stack 直接建立
  - App Sync: GraphQL service
- Deployment orchestration
  - Code Commit: git
  - Code build: build code from code commit or other 3rd party git-like service
  - Code Deploy: deploy code to other services
  - Code Pipeline: CI/CD workflow service
- Monitoring
  - CloudWatch: 監控 AWS 上的服務，可自訂 metric log & dashboard
  - CloudTrail: audit log of AWS accounts
- Rapid deployment
  - Cloud formation: infrastructure as code，can share your template
  - CDK(Cloud Development Kit): infrastructure as code, cannot share template
  - Amplify: 快速 build mobile/web app
  - SAM(Serverless Application Model): a serverless framework with cli
- Event coordination
  - SNS: push-based notification
  - SQS: pull-based message queue
  - Event Bridge: 與 SNS 類似，主要差異有
    - schema registration: service 可以註冊自己的 schema，確保 event 的格式正確
    - 3rd party integration: 可以使用第三方註冊的 schema 例如 shopify，可以直接使用 shopify 的 event
  - step function: visual workflow service，可以用簡單的 UI 來串接不同的 event notification，與 n8n, IFTTT, Zapier 類似
- Object storage
  - S3
- Analytical processing
  - EMR: Hadoop, Spark, Presto, Hive, HBase alternative
  - Athena: integrated S3, no need to setup EMR
- Data warehouse
  - Redshift
- Dashboard
  - Quick sight
