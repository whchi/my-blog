---
title: 'Ethereum POA 架設'
date: 2021-01-26T10:07:07+08:00
draft: false
author: 'whchi'
tags: ['blockchain']
summary: '使用 ubuntu 20.04'
---
簡單記錄一下
# Overview
## Terminology
{{< table "table table-bordered table-hover" >}}
|      term      | desc                                                                                                                                                  |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
|     ether      | 以太幣本身                                                                                                                                            |
|      evm       | 由各 nodes 組成的一台大型狀態管理機，每個 node 裡面都有實現 [evm yellow papaer](https://ethereum.github.io/yellowpaper/paper.pdf)的程式對整體狀態管理 |
|    accounts    | where ether is stored                                                                                                                                 |
|  transactions  | 由 account 發出的修改 EVM 狀態的訊息                                                                                                                  |
| smart contract | reusable snippets of code                                                                                                                             |
|      gas       | 手續費，每次執行 contract 時須繳付                                                                                                                    |
|      wei       | 最小單位                                                                                                                                              |
{{</ table>}}
## Account
分成兩種類型
* External actor(EOA)

一般的 account，概念同 bitcoin 的 account，由 private key 控制，不能包含 EVM code（smart contract）
* Contract account

由 EVM code 控制，實際執行 contract 的 account

# 運算方式介紹
## POW
已算力達成共識的方式，為主流方法，但難以擴展
## POS
以 stake 量達成共識的方式，跟資本主義滿像，誰有錢誰就有話語權
## POA
主動選擇被驗證的節點作為驗證者，意為以個人信譽為主，於有限節點的私有練較適合使用，跟當兵差不多，找幾個排長幫忙管理，容易擴展

# 架設 POA 環境
要架設 POA 至少要有 2 個節點，雖然可以用一個節點跑不過這樣就不帶有 POA 的意義
1. install lib
```sh
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
```
2. make nodes
```sh
mkdir node-a
# create account
geth --datadir node-a account new
# enter password then you will see something like below
####################################################################
# Your new key was generated

# Public address of the key:   0x5135f59f4De410eb731cEb901e611a1070dFD115
# Path of the secret key file: node-a/keystore/UTC--2021-01-26T03-31-40.300431739Z--5135f59f4de410eb731ceb901e611a1070dfd115
####################################################################
# save account & password
echo '5135f59f4de410eb731ceb901e611a1070dfd115' >> accounts.txt
echo 'password' >> node-a/password.txt
# make second node
mkdir node-b
geth --datadir node-b account new
# ...
echo 'node-b-account' >> accounts.txt
echo 'password' >> node-b/password.txt
```
3. create genesis file
```sh
# use build-in interactive cli is more confortable
puppeth
# begin
Please specify a network name to administer (no spaces, hyphens or capital letters please)
> any-name
What would you like to do? (default = stats)
 1. Show network stats
 2. Configure new genesis
 3. Track new remote server
 4. Deploy network components
> 2
What would you like to do? (default = create)
 1. Create new genesis from scratch
 2. Import already existing genesis
> 1
Which consensus engine to use? (default = clique)
 1. Ethash - proof-of-work
 2. Clique - proof-of-authority
> 2
How many seconds should blocks take? (default = 15)
> 3 # mining time for each block
Which accounts are allowed to seal? (mandatory at least one)
> 0x5135f59f4de410eb731ceb901e611a1070dfd115
> 0x2eb60ab83554e73eb85ea2c218f2cd4cf75ca82d
> 0x
Which accounts should be pre-funded? (advisable at least one)
> 0x5135f59f4de410eb731ceb901e611a1070dfd115
> 0x2eb60ab83554e73eb85ea2c218f2cd4cf75ca82d
> 0x
Should the precompile-addresses (0x1 .. 0xff) be pre-funded with 1 wei? (advisable yes)
> y
Specify your chain/network ID if you want an explicit one (default = random)
> 42

What would you like to do? (default = stats)
 1. Show network stats
 2. Manage existing genesis
 3. Track new remote server
 4. Deploy network components
> 2
What would you like to do? (default = stats)
 1. Show network stats
 2. Manage existing genesis
 3. Track new remote server
 4. Deploy network components
> 2

 1. Modify existing configurations
 2. Export genesis configurations
 3. Remove genesis configuration
> 2
Which folder to save the genesis specs into? (default = current)
  Will create 42.json, 42-aleth.json, 42-harmony.json, 42-parity.json
>
# end
# then you can see genesis file
ls
# 42-harmony.json  42.json  accounts.txt  node-a  node-b
```
3. init nodes
```sh
geth --datadir node-a init 42.json
geth --datadir node-b init 42.json
```
4. create bootnode
nodes 間使用 bootnode 來找到彼此
```sh
bootnode -genkey boot.key
# start
bootnode -nodekey boot.key -verbosity 9 -addr :30310
# copy enode hash
# enode://22b3bc9b4d95b30f3e1ceea30738bea44876e8437e1b757a3127c56eef3efa6684f7356e5c45a4a49ae72a1bca7800aba5fac494da222d97e68a8db2b48fc99e@127.0.0.1:0?discport=30310
export BOOTNODE_HASH=enode://22b3bc9b4d95b30f3e1ceea30738bea44876e8437e1b757a3127c56eef3efa6684f7356e5c45a4a49ae72a1bca7800aba5fac494da222d97e68a8db2b48fc99e@127.0.0.1:0?discport=30310
```
5. start nodes
```sh
# node-a with json RPC port enable
geth --datadir ./node-a --syncmode 'full' --http --http.addr '0.0.0.0' --http.port 8545 --http.api 'personal,eth,net,web3,txpool,miner'  --networkid 42 --port 30303 --bootnodes $BOOTNODE_HASH  --gasprice '20' -unlock '0x5135f59f4de410eb731ceb901e611a1070dfd115' --password ./node-a/password.txt --mine --allow-insecure-unlock
# node-b
geth --datadir ./node-b --syncmode 'full' --networkid 42 --port 30304 --bootnodes $BOOTNODE_HASH  --gasprice '20' -unlock '0x2eb60ab83554e73eb85ea2c218f2cd4cf75ca82d' --password ./node-b/password.txt --mine --allow-insecure-unlock
# if you don't see "looking for peers" then success else go into geth and set node manually
geth attach node-a/geth.ipc
admin.addPeer('0x5135f59f4de410eb731ceb901e611a1070dfd115')
admin.peers # check
```
完成後就可以用任意 client 對他寫程式了
# References
* [Proof of authority](https://en.wikipedia.org/wiki/Proof_of_authority)
* [Proof of stake](https://en.wikipedia.org/wiki/Proof_of_stake)
* [Proof of work](https://en.wikipedia.org/wiki/Proof_of_work)
* [ethereum developer doc](https://ethereum.org/en/developers/docs)
* [ethernum evm illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)
