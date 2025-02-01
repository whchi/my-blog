---
title: '[推薦] Prisma Drop Rust to Typescript'
date: 2025-02-01T20:01:47+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: '請支援 PR'
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---


# Source
https://www.prisma.io/blog/from-rust-to-typescript-a-new-chapter-for-prisma-orm

# Summary
- 原本選擇 rust 是為了支援不同與語言的 ORM，但現在已不再是主要需求
- Prisma 團隊正在逐步將 Rust 查詢邏輯遷移到 TypeScript，並使用 WASM 來確保功能的平穩過渡。開發者幾乎無需更改程式碼即可適應新架構
- TypeScript 比起 Rust 更容易提高可擴展性、降低部署複雜性，並簡化開發人員的貢獻門檻
- Rust 有幾個比較麻煩的問題
  - 部署複雜性：Rust 需要為不同系統和 OpenSSL 版本提供對應的二進制檔案，增加維護負擔
  - 相容性問題：Rust 二進制檔案在某些 JavaScript 執行環境（如 Edge 和 Serverless）可能無法良好運行
  - 技能門檻：Rust + TypeScript 的雙重要求降低了社群參與度
