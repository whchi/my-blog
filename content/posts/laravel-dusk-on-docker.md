---
title: '在 docker 上跑 laravel-dusk'
date: 2020-01-31T14:45:27+08:00
draft: false
author: 'whchi'
tags: ['laravel', 'docker']
summary: '自己挖的洞自己填'
---
最近因為要還債~~不得不寫測試~~，所以有了這篇文章

[laravel-dusk](https://laravel.com/docs/5.8/dusk)是 laravel 官方推出的瀏覽器測試框架，整合了 [selenium](https://selenium.dev/) 以利進行各種奇形怪狀的測試
## 進入主題
我們的開發環境是一個 nginx + php 的 image 作為 base container，nginx 設定不同的 server_name 把 request 導到不同的專案

這邊使用的是 standalone 的架設方式，因為原本的 docker 上沒有跑瀏覽器測試的需求

**關鍵是要讓 selenium 可以連到專案**
### docker-compose.yml
下面列的都是 `docker-compose.yml` 使用時記得加上 `-f` 或改名
* develop-env.yml
```yml
version: "3.7"
services:
  container_name: local_dev
  image: your-dev-image:version
  command: ["/usr/sbin/init"]
  ports:
    - "80:80"
    - "443:443"
  privileged: true
  networks:
    mynetwork:
      # 要給固定 ip
      ipv4_address: 172.28.0.2
```
* standalone-chrome.yml
```yml
version: "3.7"
services:
  chrome:
    container_name: local_selenium-chrome
    image: selenium/standalone-chrome:3.141.59
    ports:
      - "4444:4444"
    volumes:
      - /dev/shm:/dev/shm
    extra_hosts:
        # 這裡要指定這個 container 應該要看到的 hostname，看你的 nginx 設定
        - "local-project.dev:172.28.0.2"
networks:
  default:
    external: mynetwork
```
下面列出 laravel-dusk 要做的事
### laravel-dusk
這邊是說開發環境
* DuskTestCase.php
```php
<?php
/**
 * Create the RemoteWebDriver instance.
 *
 * @return \Facebook\WebDriver\Remote\RemoteWebDriver
 */
protected function driver()
{
    $options = (new ChromeOptions)->addArguments([
        '--disable-gpu',
        '--headless',
    ]);
    // 這邊要能讓 dusk 連的到 standalone-chrome
    return RemoteWebDriver::create(
        'http://chrome:4444/wd/hub', DesiredCapabilities::chrome()->setCapability(
            ChromeOptions::CAPABILITY, $options
        )
    );
}
```
* .env.dusk.local

獨立一個環境給 dusk 跑的時候吃，要注意的是 APP_URL
```env
# 這邊是讓 standalone-chrome 可以連的到的專案 host
APP_URL=http://local-project.dev
```
### 成果
都設定成功的話直接下 `php artisan dusk` 應該會看到畫面如下
![](/images/laravel-dusk-testing.png)

## Reference
* [laravel-dusk official doc](https://laravel.com/docs/5.6/dusk#using-other-browsers)
