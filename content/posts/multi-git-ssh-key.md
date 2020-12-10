---
title: '在 github 上多帳號與多組 ssh key 使用'
date: 2020-12-10T11:28:30+08:00
draft: false
author: 'whchi'
tags: ['git']
summary: '因公司使用 github 作為代管平台，發現在 github 上同一組 ssh key 不能直接被加到另一個 github 帳號裡面，於是有了這篇文章'
---
# Steps
## 1. create new ssh pair
```sh
ssh-keygen -t rsa -C 'myemail@example.com' -f id_rsa_mygit
```
## 2. edit `~/.ssh/config`
```txt
# company github account
Host github.com
   HostName github.com
   IdentityFile ~/.ssh/id_rsa
   IdentitiesOnly yes

# my github account
Host github-mygit
   HostName github.com
   IdentityFile ~/.ssh/id_rsa_mygit
   IdentitiesOnly yes
```
## 3. add into ssh-agent
```sh
ssh-add -D && ssh-add -L # reset all ssh keys, optional
# add them into ssh-agent
ssh-add ~/.ssh/id_rsa
ssh-add ~/.ssh/id_rsa_mygit
# ...other keys if you want
# test connection
ssh -T git@github.com
ssh -T git@github-mygit
```
## 4. clone your git project
```sh
git clone git@github-mygit:xxxxx/xxxxx.git
```
## About submodule
修改其於 `.git/modules/<folder>/config` 裡的設定
```txt
...
[remote "origin"]
    url = git@github.com-mygit:xxxxx/xxxxx.git
    fetch = +refs/heads/*:refs/remotes/origin/*
...
```
這樣就可以正常使用不同 github 帳號的 ssh key 了

## Reference
* https://deepzz.com/post/how-to-setup-ssh-config.html
