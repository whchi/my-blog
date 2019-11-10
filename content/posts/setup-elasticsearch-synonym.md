---
title: '設定 elasticsearch 同義詞'
date: 2019-10-15T18:17:14+08:00
draft: false
author: 'whchi'
tags: ['elasticsearch']
summary: '使用 docker 建立 elasticsearch 5.3 和 ik 分詞器'
---
同 solr 是基於 lucene 寫出來的開源搜尋引擎, 因此 filter, tokenizer, analyzer 的概念與 solr 是一致的

> 現在 elasticsearch 已經到 7.4

* filter, tokenizer, analyzer簡介

| 名詞      | 說明                                                                                                               |
| :-------- | :----------------------------------------------------------------------------------------------------------------- |
| tokenizer | 把 input 拆分成 token 產出 token stream                                                                            |
| filter    | 接收 token stream 並進行處理(case/replace/drop...)                                                                 |
| analyzer  | 在建立/搜尋索引的時候要怎麼處理特定類型的字串, 比如說upperFirstCase, 去掉介詞, 同義詞處理...相當於tokenizer+filter |
## 設定
* Dockerfile(包含 ik 安裝)
```docker
FROM docker.elastic.co/elasticsearch/elasticsearch:5.3.0

RUN mkdir -p /usr/share/elasticsearch/plugins/ik530 && cd /usr/share/elasticsearch/plugins/ik530 && \
    wget "https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v5.3.0/elasticsearch-analysis-ik-5.3.0.zip" && \
    unzip elasticsearch-analysis-ik-5.3.0.zip && rm elasticsearch-analysis-ik-5.3.0.zip;

# 記得先放
COPY ./synonym.txt /usr/share/elasticsearch/config/analysis/synonym.txt
COPY ./stopwords.txt /usr/share/elasticsearch/config/analysis/stopwords.txt

USER elasticsearch
```

* synonym.txt
, 跟 => 的意義同 solr
```txt
攝氏 => 華氏
台灣,臺灣,臺灣黑熊
```
* [stopwords.txt](https://github.com/goto456/stopwords)

* docker-compose.yml
```yml
version: '3'
services:
  elasticsearch:
    build: .
    environment:
      - 'http.host=0.0.0.0'
      - 'transport.host=127.0.0.1'
      - 'ES_JAVA_OPTS=-Xms512m -Xmx512m'
      - 'xpack.security.enabled=false'
      - 'ACCESS_TOKEN=e-D9WyQzxfRbpdFvFdhQ'
    ports:
      - '9200:9200'
      - '9300:9300'
    volumes:
      - '/path/to/local/index:/usr/share/elasticsearch/data'
    container_name: local_es
```

## 執行
記得把 Dockerfile 放在與 docker-compose.yml 同層
```sh
docker-compose up -d
```
## 測試
順利跑起來的話輸入 `localhost:9200` 可以看到 json 如下
```json
{
  "name": "imYjhHG",
  "cluster_name": "docker-cluster",
  "cluster_uuid": "Wq9XBSrlRN6371m4jggxUQ",
  "version": {
    "number": "5.3.0",
    "build_hash": "3adb13b",
    "build_date": "2017-03-23T03:31:50.652Z",
    "build_snapshot": false,
    "lucene_version": "6.4.1"
  },
  "tagline": "You Know, for Search"
}
```
* [PUT]新增 index

直接打 `localhost:9200/{indexname}?pretty`

* [PUT] 設定 mappings(token的欄位與型態) & settings(如何處理token)

```json
{
  "index": "{indexname}",
  "body": {
    "mappings": {
      "metafield1": {
        "properties": {
          "field1": {
            "type": "text"
          },
          "field2": {
            "analyzer": "ik_syno_max",
            "search_analyzer": "ik_syno_smart",
            "type": "text"
          },
          "field3": {
            "analyzer": "ik_syno_max",
            "search_analyzer": "ik_syno_smart",
            "type": "text"
          },
        }
      },
      "metafield2": {
        "properties": {
          "field1": {
            "type": "text"
          },
          "field2": {
            "type": "long"
          },
          "location": {
            "type": "geo_point"
          }
        }
      }
    },
    "settings": {
      "analysis": {
        "analyzer": {
          "ik_syno_smart": {
            "type": "custom",
            "tokenizer": "ik_smart",
            "filter": [
              "filter_stop",
              "filter_syno"
            ]
          },
          "ik_syno_max": {
            "type": "custom",
            "tokenizer": "ik_max_word",
            "filter": [
              "filter_stop",
              "filter_syno"
            ]
          }
        },
        "filter": {
          "my_synonym": {
            "type": "synonym",
            "synonyms_path": "analysis/synonym.txt"
          },
          "my_stopword": {
            "type": "stop",
            "stopwords_path": "analysis/stopwords.txt"
          }
        }
      }
    }
  }
}
```
* [POST]查看同義詞是否成功

```json
// request
{
    "text": "流行性感冒",
    "analyzer": "ik_syno_smart",
    "filter": ["filter_syno", "filter_stop"]
}
// response
{
    "tokens": [
        {
            "token": "流感",
            "start_offset": 0,
            "end_offset": 5,
            "type": "SYNONYM", // 成功
            "position": 0
        }
    ]
}
```
## References
* [filter, analyzer, tokenizer](https://lucene.apache.org/solr/guide/7_4/understanding-analyzers-tokenizers-and-filters.html)
* [elasticsearch official document](https://www.elastic.co/guide/index.html)
