---
title: '[推薦] Postgres vs Mysql'
date: 2023-06-19T13:53:58+08:00
draft: false
author: 'whchi'
tags: ['recommendations']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source
https://medium.com/@hnasr/postgres-vs-mysql-5fa3c588a94e 9min

# Summary
- Postgres和MySQL主要的差異在於主索引和次索引的實作，以及資料如何被儲存和更新。在MySQL中，主索引包含了完整的資料列，而次索引則指向主鍵。如果未創建主鍵，MySQL將會自動生成一個。在Postgres中，所有的索引都被視為次索引，指向系統管理的元組ID在資料頁中。
- 兩種系統處理更新和刪除的方式不同。在MySQL中，更新非索引欄位只需修改相應的葉頁，而在Postgres中，它將產生一個新的元組，並可能需要所有次索引使用新的元組ID進行更新，導致更多的寫入I/O。
- 選擇主鍵時，資料類型是需要考慮的因素。在MySQL中，主鍵的資料類型會影響次索引的大小，而在Postgres中，元組ID的大小固定為4位元組，不受資料類型影響。
- 兩種資料庫都支援多版本並發控制(MVCC)，但實作方式不同。MySQL使用反轉日誌(undo logs)來維護交易處理中的資料舊狀態，而Postgres則在每次更新、插入或刪除操作時創建一個新的列，使交易能根據其交易ID讀取舊的或新的元組。
- MySQL使用線程，而Postgres使用進程。線程較為輕量且與其父進程共享虛擬記憶體地址，而進程則帶有專用虛擬記憶體和較大的控制區塊的開銷。兩者皆有其優缺點，且選擇取決於特定項目的需求。
