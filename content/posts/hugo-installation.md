---
title: 'Hugo安裝'
date: 2018-12-19T15:48:17+08:00
draft: false
author: 'whchi'
summary: '簡單介紹安裝hugo的方法，mac only'
tags: ['hugo']
---
## Step1. install hugo
install [homebrew](https://brew.sh/index_zh-tw)
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

then install hugo
```
brew install hugo
```

## Step2. start a hugo project
make your project folder
```
hugo new site your_blog
cd your_blog
```
## Step3. add theme
you can find more themes [here](https://themes.gohugo.io)
```
mkdir themes

# use git clone
git clone https://github.com/josephhutch/aether.git themes/aether

# use git submodule(recommend)
git submodule add https://github.com/josephhutch/aether.git themes/aether
```
enable theme
```
vim config.toml
# add new line
theme = "aether"
```

## Step4. add post
`hugo new posts/first-post.md`
change `draft: true` then run `hugo server -w` for local test

## Step5. publish to github
Because this is my personal website, so I use User/Organization Pages

1. create `{your-project}` repo on your github
2. create `{username}.github.io` repo on your github
3. add github page to submodule `git submodule add -b master git@github.com:{username}/{username}.github.io.git public`(you can use https as git url too)

4. add shell to project folder, named `deploy.sh`
    ```
    #!/bin/bash

    echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"
    # Build the project.
    hugo # if using a theme, replace with `hugo -t <YOURTHEME>`


    # Go To Public folder
    cd public
    # Add changes to git.
    git checkout master

    git add .

    # Commit changes.
    git commit -m "rebuilding site `date`"

    # Push source and build repos.
    git push origin master

    # Come Back up to the Project Root
    cd ..

    msg="updated at `date`"
    if [ $# -eq 1 ]
    then msg="$1"
    fi
    git add .
    git commit -m "$msg"

    git push origin master

    ```
5. run `git commit -am "yout website-hugo commit message "` then `git push origin master`
6. deploy to `{yourname}.github.io` with `./deploy.sh "your commit message"`

## Reference
* [hosting hugo on github](https://gohugo.io/hosting-and-deployment/hosting-on-github/)
* [在github部署hugo靜態網站](https://medium.com/@chs_wei/在-github-部署-hugo-靜態網站-9c40682dfe40)
