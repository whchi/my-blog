---
title: '發 Pull Request 的正確姿勢'
date: 2022-10-19T11:58:03+08:00
draft: false
author: 'whchi'
tags: ['git', 'github']
summary: ''
preview_figure: 'https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&h=394&q=80'
preview_figcaption: ''
preview_image: 'https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
---

在超多人對同一個 repo 進行開發的情況下很常會有發出去的 PR 過幾週甚至月才被合併的情況發生，會有不少小團隊很少遇到的問題

1. 與大量他人的 commit 發生衝突
2. 有共用的地方被改掉導致原本的 PR 失敗
3. 沒有衝突但一上去就壞掉，且很難看出原因
4. reviewer 看 code 效率變低甚至可能無意義

因此在發 PR 時要使用 rebase 功能簡化 commit，讓處理這些問題的阻力降至最低

# rebase
rebase 字義上就是重新定義 base branch，詳細功能描述可參考 [https://backlog.com/git-tutorial/tw/stepup/stepup2_8.html](https://backlog.com/git-tutorial/tw/stepup/stepup2_8.html)

主要目的是讓 branch 變乾淨

有概念後可以很容易的理解為何用他有辦法解決一開始提到的問題

# 如何發 PR

0. 確認 branch 是從 repo 的 main 切出來
1. 整理開發好的 commit
    ```sh
    # fetch to latest upstream history
    git fetch origin
    # 查看所有屬於自己的 commit
    git log --author="your-name"
    # 選擇要 rebase 的 head commit，或是取得你自己建立的 commit 總數後進行 rebase
    git rebase -i HEAD~n
    # 如果你忘記你是從哪個 commit 切的可以用 merge-base 找出
    git merge-base current_branch main
    # 66e506853b0366c87f4834bb6b39d341cd094fe9
    # then
    git rebase -i 66e506853b0366c87f4834bb6b39d341cd094fe9
    ```
   在 interactive 介面可以對 commit 進行 squash 或是 reword

   **squash**: 要整併的 commit

   **reword**: 要修改 commit log 的 commit
2. 整理完畢後，rebase 到 main branch
    ```sh
    git rebase origin/main
    # 可能會有衝突，解完之後繼續進行 rebase
    git rebase --continue
    ```
3. rebase 玩主要 branch 後推上當前 PR
    ```sh
    git push -f
    ```
    使用 force push 的原因是因為遠端 branch 的 history 還在發 PR 當下，而本地的 history 已經被 rebase 打亂了，所以不能先 pull 否則會回到原本的 histiry
4. 成功合併後記得刪除 branch
    ```sh
    git branch -D <branch_name>
    git push origin :<branch_name>
    ```

# References
* https://www.digitalocean.com/community/tutorials/how-to-rebase-and-update-a-pull-request

