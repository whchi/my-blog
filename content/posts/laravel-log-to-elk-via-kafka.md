---
title: "將 laravel log 透過 kafka 送入 ELK"
date: 2018-12-29T17:30:24+08:00
draft: false
author: 'whchi'
type: 'posts'
tags: ['laravel','devops','php', 'kafka', 'elk']
summary: '就像在烤肉時，把雞肉、青椒以及杏苞姑串再一起的概念'
---
簡單解釋一下

### ELK 是什麼
> Elasticsearch + Logstash + Kibana = ELK

* [Elasticsearch](https://www.elastic.co/products/elasticsearch): 搜尋引擎，類似的有 luence / solr
* [Logstash](https://www.elastic.co/products/logstash): 搜集 log 的服務，可透過撰寫設定檔的方式指定不同的 input / output
* [Kibana](https://www.elastic.co/products/kibana): 視覺化 elasticsearch 資料的網頁服務

如果有點進去連結的人會發現**根本就是同一間公司的產品啊！！**\
...是的沒錯，市面上類似的競爭者還有 **Graylog**

### kafka 是什麼
由 Apache 基金會維護的 MQ(Message Queue) 服務，看到 **Apache** 這幾個字基本上就放心地使用吧

* 專有名詞簡述

|名詞|說明|
|:--|:--|
|broker|每個群集都會有 1toN 個服務器，這個服務器被稱作 broker|
|topic|每條訊息所屬的類別(物理上分開儲存)|
|partition|物理上的概念，每個topic有 1toN 個topic|
|producer|訊息生產者|
|consumer|訊息接收者|
|consumer group|每個 consumer 屬於一個 group，可作群組訊息管理|
<br>
大概有個概念就行了

## Install ELK+Kafka
這裡用`docker-compose`安裝

1. 先把庫抓下來`git clone https://github.com/wurstmeister/kafka-docker.git`
2. 修改`docker-compose-single-broker.yml`如下
```yml
version: '3'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
    container_name: local_zp
  kafka:
    build: .
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: local_kafka # kafka command 啟動時的 hostname
      KAFKA_CREATE_TOPICS: "localtest"
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    container_name: local_kafka
  elk:
    image: sebp/elk
    ports:
     - '5601:5601'
     - '9200:9200'
     - '5044:5044'
    container_name: local_elk
```
1. 啟動容器`docker-compose -f docker-compose-single-broker.yml up`

#### 設定 logstash conf
進入 local_elk container 並增加 logstash 接收 kafka 訊息的設定如下
```conf
input {
  kafka {
    bootstrap_servers => "local_kafka:9092"
    topics => ["localtest"]
  }
}

output {
   if [type] == "laravel" {
       elasticsearch {
         hosts => "localhost:9200"
         index => "laravel-%{+YYYY.MM.dd}" }
   }
}
```
完成後重啟 logstash `service logstash restart`

**需要注意的地方是 `bootstrap_servers` 與 `KAFKA_ADVERTISED_HOST_NAME` 要一致，不然 logstash 會找不到**

## laravel 寫些什麼
1. 安裝套件`composer require nmred/kafka-php`
2. 繼承 laravel logger
```php
<?php

namespace App\Hubs;

use Monolog\Handler\AbstractProcessingHandler;

class KafkaLogHubber extends AbstractProcessingHandler
{

    public function __construct()
    {
        $this->bubble = false;
    }

    protected function write(array $record)
    {
        $config = \Kafka\ProducerConfig::getInstance();
        $config->setMetadataRefreshIntervalMs(10000);
        $config->setMetadataBrokerList('127.0.0.1:9092');
        $config->setBrokerVersion('2.1.0');
        $config->setRequiredAck(1);
        $config->setIsAsyn(false);
        $config->setProduceInterval(500);
        $producer = new \Kafka\Producer();
        $producer->send([
            [
                'topic' => 'logstash',
                'value' => $record['formatted'],
                'key' => '',
            ],
        ]);

    }

    protected function getDefaultFormatter()
    {
        // setup formatter (default use LineFormatter)
        return new \Monolog\Formatter\LogstashFormatter;
    }
}
```
1. 修改預設的 logger 為 KafkaLogHubber
```php
<?php
// in bootstrap/app.php

...

$app->configureMonologUsing(function ($monolog) {
    $monolog->pushHandler(new \App\Hubs\KafkaLogHubber);
});

...

return $app;
```
之後在任何地方使用 `\Illuminate\Support\Facades\Log` 都會寫到 kafka 裡面拉

- - -
要查看結果有兩個方法

1. 使用 kibana: `localhost:5601`即可
2. 使用 [kafka tool](http://www.kafkatool.com): 使用這個方法的人記得修改`/etc/hosts`讓本地可以認識`local_kafka`這個 domain

## 補充說明

* 範例使用laravel5.5, 5.6+ 的 logging 更加彈性，可擴充至 custom channel 進而保留原始的 logging
* 要直接測試 kafka 參考 [kafka-php github](https://github.com/weiboad/kafka-php)

## Reference
* [logstash examples](https://www.elastic.co/guide/en/logstash/current/config-examples.html)
* [laravel 使用 kafka 寫入 log](https://58hualong.cn/blog/post/laravel-shiyong-kafka-yibu-yanchi-xieru-de-rizhi-de-fangfa)
