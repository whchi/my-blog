---
title: '[推薦] Redis Interview Deep Questions'
date: 2023-09-24T16:10:55+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source
https://www.youtube.com/watch?v=nrgATM0yPO8 14:33

# summary
- 性能
1. redis 存取是 single-threaded（網路 IO、set get 等），single-thread 避免了 context-switch 且操作都在 ram 中完成，IO 的部分採用了 multiplexing(select) 來處理 socket 請求
2. redis 的群集、持久化是由其他的 thread 處理
3. redis 6.0 之後開始使用 multi-thread 處理網路 IO，讀寫仍然是 single-thread
4. redis 4.0 之後的 muti-thread 是異步刪除
- 持久化

把 ram 的數據存到 disk 已實踐
1. AOF: 記錄所有的 command append to doc，先執行後才存入，不同於一般的 RDB 是儲存執行前的指令，原因是 redis 不會執行語法檢查，避免紀錄錯的 command 以及提高 IO
2. RDB: 記錄某個時段的資料，用 binary 的方式寫入，在數據恢復的效能比 AOF 好，使用 bgsave 可以避免對主線程阻塞（資料修改時會拿修改過的副本執行 save）
3. 混合: redis4.0~ 提供，把數據以 RDB 的方式寫入，對後續的命令以 AOF 的格式存入，同時保證重啟速度與降低 data loss
- 高可用
1. master-slave：讀寫分離，同 mysql，但 crush 需要手動回覆
2. sentinel：master-slave 的自動恢復功能
3. cluster：資料分布在多個 server 上
   1. 使用 hash slot(CRC 16 key and % 16383(16bit int)) 來處理 data 與 instance 的 mapping
   2. 平均分配：平均分佈 hash slot，`cluster create`
   3. 手動分配：`cluseter meet` & `cluster addslots`

