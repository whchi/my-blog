---
title: 'Mongodb 讀寫分離'
date: 2020-07-27T15:21:29+08:00
draft: false
author: 'whchi'
tags: ['mongo', 'docker']
summary: '小學時學到怎麼切八段，出社會後終於有學以致用的一天'
---

最近有用到 mongo 實作讀寫分離，紀錄一下

mongo 的讀寫分離是用 replica set 實作，裡面的 node 分為 primary-secondary，不同於 mysql 的 master-slave。

每個 replica set 只能有一個 primary node，不敷使用時其他 secondary node 會進行[投票](https://docs.mongodb.com/manual/core/replica-set-elections/)決定誰才是下一個 primary，因此要架的話最好要使用單數個 node
## node 差別
### primary node
* 接收所有 write 操作，搭配 write concern 設定可以確保各個 node 有無正確被寫入
* 接收 read / write 操作
### secondary node
* 接收來自 primary 的 [oplog](https://docs.mongodb.com/manual/core/replica-set-oplog/) 以進行 data replication
* 接收 read 操作
### arbiter node
* 只出嘴不出力，跟大多數的**官**一樣（只有投票功能的節點）
## 設定方法
這裡用 [keyfile](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-with-keyfile-access-control/) 的方式，省得建帳號
### mongod.conf
```conf
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log
storage:
  dbPath: /var/lib/mongo
  journal:
    enabled: true
net:
  port: 27017
  bindIp: 0.0.0.0
security:
  authorization: enabled
  keyFile: /etc/mongo.d/replica-keyfile ;同把 key 要 co 到 secondary 上
replication:
  replSetName: "rs0"
```
基本上 secondary 的設定是一樣的，可以搭配 [mongo shell 設定](https://docs.mongodb.com/manual/tutorial/configure-mongo-shell/)修改進入後呈現的樣子讓操作時更清楚當前位置
## readPreference
設定讀寫分離時有個需注意的東西叫`readPreference`，共有五種類型，參考下表
{{< table "table table-bordered" >}}
|名稱|說明|
|:--:|:--|
|primary|預設，所有讀操作都只會從 primary 進行，如果該 node 死掉則出現 error|
|primaryPreferred|primary 死掉時會從 secondary 找，如有設定 tag 的話會從符合的 tag 中找最近的|
|secondary|只從 secondary 讀，secondary 全死就出錯|
|secondaryPreferred|如果只有兩個 node，且其中一個是 primary 的話就從 primary 讀|
|nearest|依 latency 選擇回應最快的節點接收讀操作|
{{< /table >}}
## 本地架設範例
1. docker-compose.yml
```yml
version: '3.7'
services:
  mongo_primary:
    restart: always
    image: mongo:4
    volumes:
      - ./data:/data/db
    ports:
      - '27017:27017'
    entrypoint:
      ['mongod', '--port', '27017', '--bind_ip_all', '--replSet', 'rs0']
    container_name: local_persona_mongo_primary
  mongo_rep1:
    image: mongo:4
    restart: always
    ports:
      - '27027:27027'
    entrypoint:
      ['mongod', '--port', '27027', '--bind_ip_all', '--replSet', 'rs0']
    container_name: local_persona_mongo_rep1
  mongo_rep2:
    image: mongo:4
    restart: always
    ports:
      - '27037:27037'
    entrypoint:
      ['mongod', '--port', '27037', '--bind_ip_all', '--replSet', 'rs0']
    container_name: local_persona_mongo_rep2
```
2. 進去啟動 replica
```sh
docker exec -ti local_persona_mongo_primary sh
# in container
mongo --eval 'rs.initiate( { _id : "rs0",members: [{ _id: 0, host: "mongo_primary:27017" },{ _id: 1, host: "mongo_rep1:27027" },{ _id: 2, host: "mongo_rep2:27037" }]})'
```
3. 設定本地 hosts 讓本地的 request 可以連到機器（也可以把開發環境掛在跟docker-compose一起就不用這步）
```sh
sudo echo '127.0.0.1 mongo_primary mongo_rep1 mongo_rep2' >> /etc/hosts
```
接著就可以看你用的lib決定怎麼設定偏好，以 node 的 mongoose 舉例如下
```js
model.aggregate().read('sp') // secondaryPreferced
model.findOne({cond},{ readPreference: 'secondaryPreferred' })
```
## Reference
* [官方文件](https://docs.mongodb.com/manual/tutorial/deploy-replica-set/)
