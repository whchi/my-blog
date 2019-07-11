---
title: "git 管理子庫的兩種方式"
date: 2018-12-21T09:35:24+08:00
draft: false
author: 'whchi'
tags: ['git', 'hugo']
summary: 'subtree or submodule? that is a question.'
---

最近架設 hugo 時查詢的資料發現有使用`git subtree`跟`git submodule`兩種抓 theme 的方法，研究後把差別記錄在這

## 主要差異
submodule: 適合不需對 sub repo 進行 push 的動作時使用\
subtree: 適合需要把 master repo 的某些 feature 獨立成一個 git branch 時使用

## subtree
* concept\
把整個外部 repo 以及 commit log 拷貝到新的 repo 中，如同名稱一樣，就是「子樹」的概念，可把它視為完全獨立於 master repo 底下的 repo
* init
  * remote as subtree: `git remote add {remote-name} {remote repo}` + `git subtree add -P {localModulePath} {remote-name} {ref branch}`
  * local as subtree: `git subtree split -P {localModulePath} -b {ref branch}`
* delete\
  只需刪除新增的 branch 即可
* push / pull\
  用法就跟一般的push / pull一樣，差別在於多了 subtree，e.g: `git subtree push -P {localModulePath} {repository} {ref branch}`

## submodule
* concept\
建立與外部 repo 的 HEAD commit 連結，但由於僅是連結，要進行 push 的話會比較複雜，因此較適合使用的 repo 本身僅需維持在某特定版本的情境
* init\
完成後會出現`.gitmodules`檔案，內容紀錄 submodule 相關的 ref，記得先 commit
  * 不指定 branch: `git submodule add {remote repo} {localpath}`
  * 指定 branch: `git submodule add -b {branch} {remote repo} {localpath}`
* delete\
  有兩種方法
  * `git rm --cached {localpath}` + `.git/config` + `.gitmodules`
  * `git submodule deinit {localpath}` + `git rm {localpath}`
* push

  ```
  cd /path/to/submodule
  git checkout master
  git commit -am 'commit msg'
  git push origin master

  # push 完 submodule 之後 root 層會多一個 unstaged 的 change
  # 內容是 submodule 的 hash 改變
  # 因此要回到 root 多進行一次 push 才能確保專案正常

  cd /path/to/root
  git commit -am 'commit msg'
  git push origin master
  ```
* pull\
  `git submodule update --init` or `git submodule init` + `git submodule update`

## Reference
* https://stackoverflow.com/questions/31769820/differences-between-git-submodule-and-subtree
* https://hexo.crboy.net/2016/09/amazing-git-subtree/
* http://yutin.logdown.com/posts/188306-git-subtree-total-addendum-library
* https://stackoverflow.com/questions/5814319/git-submodule-push
