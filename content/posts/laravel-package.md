---
title: "開發並部署 laravel package 到 github 上"
date: 2019-03-18T16:38:36+08:00
draft: false
author: 'whchi'
type: 'posts'
tags: ['laravel']
summary: '最近花了點時間把以前寫的東西改成laravel package，留個筆記'
---
## 注意事項
* 路徑要符合 [PSR-4](https://www.php-fig.org/psr/psr-4/) 規範，autoload 才找得到
* 使用 `git-tag` 對 package 版號控管
* 套件內的 `composer.json` 的 require 很重要，如果有相依於 laravel 版本的話要注意

資料夾呈現結果如圖\
![](/images/laravel-package-folder-structure.png)

接下來說明步驟
- - -
## 開發
### Step1. 建立專案
這裡以 5.5 為例
```sh
cd /path/to/your/package-develop-project && composer create-project --prefer-dist laravel/laravel . "5.5.*"
```
### Step2. 建立 package 開發路徑
於 laravel documentroot 建立 packages folder, path如下
```sh
packages/{vendor-name}/{package-name}/src
```
並於 src 層使用`composer init`填入相關資料，以下是我的範例
```json
{
  "name": "cw/kafkalogger",
  "description": "send log direct into kafka",
  "type": "library",
  "license": "MIT",
  "authors": [
    {
      "name": "whchi",
      "email": "whccchi@gmail.com.tw"
    }
  ],
  "minimum-stability": "dev",
  "require": {
    "php": ">=7.1",
    "laravel/framework": "5.5.*",
    "Psr/Log": "1.0.2",
    "nmred/kafka-php": "v0.2.0.8"
  },
  "autoload": {
    "psr-4": {
      "Cw\\KafkaLogger\\": "src/"
    }
  }
}
```
要注意的地方是
```json
{
  "require": {
    ...
    "laravel/framework": "5.5.*",
    ...
  },
  ...
  "autoload": {
    "psr-4": {
      "Cw\\KafkaLogger\\": "src/"
    }
  }
}
```
這兩個地方要填正確

### Step3. 調整根目錄 composer.json，以利測試
回到你的 laravel app 根目錄，修改 composer.json如下
```json
{
  ...
  "psr-4": {
    "App\\": "app/",
    "Cw\\KafkaLogger\\": "packages/cw/kafkalogger/src/"
  }
}
```
設定好後 `composer dump-autoload`
### Step4. 建立 ServiceProvider
**用 ServiceProvider 是因為有 `register` 跟 `boot`，不需要的話可以用其他方式建立**\
懶得打字的話直接用 `php artisan make:provider YourServiceProvider`，再把它 copy 到 src 底下，參考程式範例如下
```php
<?php
namespace Cw\KafkaLogger;

use Illuminate\Support\ServiceProvider;

class KafkaLogServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        var_dump('hello my package');
    }
}
```
並在 `config/app.php` 加入包含 namespace 的 provider
```php
'providers' => [
    ...
    Cw\KafkaLogger\KafkaLogServiceProvider::class,
    ...
]
```
### Step5. 進行測試
使用內建的 server 即可測試`php artisan serve`，進到首頁看到如圖結果表示成功
![](/images/package-testing-success.png)
- - -
## 部署至 github
跟一般的部屬一樣，但假如是開 [private repo](https://technews.tw/2019/01/08/github-unlimited-free-private-repositories/) 的話要[申請 token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
### 使用 git-tag 進行版本控管
composer 對於使用 git 進行版控的 package 的版本定義是使用 tag，原因參考[這裡](https://getcomposer.org/doc/articles/versions.md#composer-versions-vs-vcs-versions)，因此在部署時記得要把 tag 一起推上去，操作如列表

{{< table "table table-bordered" >}}
| 說明             | 指令                                                             |
| :--------------- | :--------------------------------------------------------------- |
| add local tag    | `git tag -a {版本號} -m '非必要的描述'`                          |
| add remote tag   | `git push --tags`                                                |
| remove local tag | `git tag -d {版本號}`                                            |
| add remote tag   | `git push --delete [remotereponame] {版本號}`，不指定則為 origin |
{{</ table>}}
- - -
## 使用 composer 安裝
部署上去最的目的是使用 composer 安裝，composer 有指定 package 要去哪抓的[設定](https://getcomposer.org/doc/05-repositories.md#vcs)，參考設定如下
```json
{
  "require-dev": {
    "cw/kafkalogger": "1.0.*",
    ...
  },
  "autoload": {
    ...
    "psr-4": {
      "App\\": "app/"
    }
  },
  ...
  "repositories": [
    {
      "type": "vcs",
      "url": "git@ssh.dev.azure.com:v3/cwgroup/digital-products/kafkalogger"
    }
  ]
}
```
記得把 autoload 改回原本的樣子
- - -
## Reference
* [如何開發自已的Package?](https://oomusou.io/laravel/laravel-package-hello-world/)
* [標籤跟分支有什麼不一樣?](https://gitbook.tw/chapters/tag/tag-vs-branch.html)
