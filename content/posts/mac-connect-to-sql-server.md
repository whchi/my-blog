---
title: 'Mac Connect to SQL Server'
date: 2019-09-05T11:30:49+08:00
draft: false
author: 'whchi'
tags: ['mac', 'sqlserver', 'python']
summary: '以 python 為例'
---
前陣子需要用 mac 連 sql server, 記錄一下\
這裡用[DSN](http://mirlab.org/jang/books/asp/odbc&dsn.asp?title=18-1%20ODBC%20%BBP%20DSN%20%C2%B2%A4%B6)連線
## Step1 安裝driver
使用 brew
```sh
brew update
brew install unixodbc freetds
```
## Step2 修改 odbc 設定
in `/usr/local/etc/odbcinst.ini`
```sh
[FreeTDS]
Description=FreeTDS Driver for Mac & MSSQL
Driver=/usr/local/lib/libtdsodbc.so # 這兩個 .so 在下 brew install unixodbc 的時候會自己裝到這
Setup=/usr/local/lib/libtdsodbc.so
UsageCount=1
```
in `/usr/local/etc/odbc.ini`
```sh
[TEST_DB] # DSN名稱, 要跟 freetds.conf 的 name mapping
Description         = test_db # 隨便
Driver              = FreeTDS # 要跟 odbcinst.ini 的 name mapping
Servername          = TEST_DB # 隨便
```
in `/usr/local/etc/freetds.conf`
```sh
[TEST_DB]
    host = sqlserver host
    port = sqlserver port
    tds version = 7.3 # version 說明參考 https://www.freetds.org/userguide/choosingtdsprotocol.htm
```
## Step3 測試連線
設定完成後用command測試能否連上
```sh
tsql -S TEST_DB -U username -P password
```
下完有看到類似下面的畫面表示成功
```sh
locale is "zh_TW.UTF-8"
locale charset is "UTF-8"
using default charset "UTF-8"
1>
```
## python 連線範例
安裝必要套件
```sh
pip install sqlalchemy pyodbc
```
範例如下
```py
from sqlalchemy import create_engine
namespace = YOUR_NAME_SPACE
account = YOUR_ACCOUNT
password = YOUR_PASSWORD
DSN = 'TEST_DB'
engine = create_engine(
    f'mssql+pyodbc://{namespace}\\{account}:{password}@{DSN}')
con = engine.connect()
# more sample @see https://kite.com/python/docs/sqlalchemy.dialects.mssql.pyodbc
```
## Reference
* [Connecting to SQL Server from Mac OSX](https://github.com/mkleehammer/pyodbc/wiki/Connecting-to-SQL-Server-from-Mac-OSX)
