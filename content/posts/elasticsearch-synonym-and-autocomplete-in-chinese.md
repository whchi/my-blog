---
title: '[From medium]Elasticsearch 中文同義詞與自動完成'
date: 2021-07-09T18:27:31+08:00
draft: false
author: 'whchi'
tags: ['elasticsearch', 'medium']
summary: 'medium 搬過來的'
preview_figure: 'https://assets.d6i.dev/blog/preview/synonym-demo.webp'
preview_figcaption: '康健知識庫自動完成示意圖，Elasticsearch 版本 7.6.2'
---
> #### **Originally published at https://medium.com/@whccchi on May 2, 2020. [原文網址](https://medium.com/cw-itgroup/elasticsearch-%E4%B8%AD%E6%96%87%E5%90%8C%E7%BE%A9%E8%A9%9E%E8%88%87%E8%87%AA%E5%8B%95%E5%AE%8C%E6%88%90-693410e68b0a?source=collection_home---4------0-----------------------)**

最近幫公司實作自動完成的功能，趁機補了一下相關的基礎知識，寫在這邊跟各位分享，這篇文章提供要使用 Elasticsearch 完成中文同義詞與自動完成所需的最小知識。

## 專有名詞
{{< figure
    src="https://assets.d6i.dev/blog/elasticsearch-terms.webp"
    title="elasticsearch terms"
    caption="右側是 RDBMS 的名詞，用類比的方式比較有帶入感">}}
其中有幾個概念跟這篇文章比較有關

* document

可以被 index 的最小單位。

* settings

針對某個 index 的 tokenizer、filter、shards、replica…等的設定，可以 update，要先關閉後才能做。

* mappings

定義某個index包含的fields的儲存方式，無法 update，有分靜態和動態，動態是指當有新 field 產生時 Elasticsearch 會嘗試猜測並賦予類型，只支援[這幾種類型](https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-field-mapping.html)。

> 額外要提的是 type：在 7.0 版本之後預設移除，8.0 則不支援，官方說明原因為其設計理念與 Luence 實際儲存資料的方式有衝突：在 RDBMS 的 context 中，table 之間的 column 不會互相影響，而在 Elasticsearch 對 filed 儲存方式是在同個 index 裡面同名稱的 field 吃同樣的 mapping，跟原本想做到的概念相違。

## index概念簡介
{{< figure
    src="https://assets.d6i.dev/blog/elasticsearch-index-intro.webp"
    title="elasticsearch index intro"
    caption="Inverted Index 也是經過 Analyzer 之後才走">}}
doc 透過 analyzer 處理後儲存成類似圖中的表，搜尋時用 [Inverted index](https://en.wikipedia.org/wiki/Inverted_index) 的方法找出其於表中出現的次數，再去推出要找的doc，如圖中輸入”somethin funny” 查找後發現 “something”跟”funny”都有出現在 doc1 中，因此回傳 doc1 作為搜尋結果。

## analyzer概念簡介
analyzer 由三個部分組成由處理順序左到右如圖，只有 **text field** 才支援 analyzer 設定。
{{< figure
    src="https://assets.d6i.dev/blog/elasticsearch-analyzer-intro.webp"
    title="elasticsearch analyzer intro"
    caption="Character Filter + Tokenizer + Token Filter = Analyzer">}}
輸入字串透過 character filter 把字串的 html tag 去除後經過 whitespace tokenizer 去掉空白字元，最後經過 synonym filter 把同義字替換後再存到Inverted index 中準備提供查詢。

有了 analyzer 的概念後在設定同義詞時會比較明白在設定的到底是什麼。

## 同義詞
這邊使用 ik 分詞器，比較老牌（出問題比較能找到解）的中文分詞器，搭配自定義的`字典檔`以及`同義字字庫`就能開始使用，在 analyzer 中是屬於 Tokenizer 的層級。

### 範例
* 字典檔（custom-dict.txt）：讓進去的字不要被切斷，能夠正確被同義字字庫比對。
```txt
胃食道逆流
流行性感冒
```
* 同義字字庫（synonym.txt）
```txt
流感,流行性感冒
胃食道逆流=>胃病
```
* Dockerfile
```dockerfile
FROM elasticsearch:7.6.2

RUN ./bin/elasticsearch-plugin install -b [https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.6.2/elasticsearch-analysis-ik-7.6.2.zip](https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.6.2/elasticsearch-analysis-ik-7.6.2.zip)
RUN mkdir -p /usr/share/elasticsearch/config/analysis-ik/custom

COPY ./dict/custom-dict.txt /usr/share/elasticsearch/config/analysis-ik/custom/custom-dict.dic
COPY ./dict/synonym.txt /usr/share/elasticsearch/config/analysis/synonym.txt

USER elasticsearch
```
利用上面這些範例可快速在本地建立一個具有 ik 分詞功能的 elasticsearch，接著在設定 mapping 與 setting
```json
// PUT /<index>
{
  "mappings": {
    "properties": {
      "field1": {
        "analyzer": "ik_syno_max",
        "search_analyzer": "ik_syno_smart",
        "type": "text"
      },
      "field2": {
        "analyzer": "ik_syno_max",
        "search_analyzer": "ik_syno_smart",
        "type": "text"
      }
    }
  },
  "settings": {
    "analysis": {
      "analyzer": {
        "ik_syno_smart": {
          "type": "custom",
          "tokenizer": "ik_smart",
          "filter": ["my_synonym"]
        },
        "ik_syno_max": {
          "type": "custom",
          "tokenizer": "ik_max_word",
          "filter": ["my_synonym"]
        }
      },
      "filter": {
        "my_synonym": {
          "type": "synonym",
          "synonyms_path": "analysis/synonym.txt"
        }
      }
    }
  }
}
```
設定成功的話測試結果如下
```json
// POST /<index>/_analyze

// request
{
    "text": "流行性感冒",
    "analyzer": "ik_syno_max"
}
// response
{
    "tokens": [
        {
            "token": "流感",
            "start_offset": 0,
            "end_offset": 5,
            "type": "SYNONYM", // 同義詞判斷成功
            "position": 0
        }
    ]
}
```
## 自動完成

官方推薦兩種方式

1. Completion Suggester

回應速度很快，但其[資料結構](https://en.wikipedia.org/wiki/Finite-state_transducer)因素只能做到prefix completion。

2. search-as-you-type （7.2~）

使用 [shingle token filter](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-shingle-tokenfilter.html) 當作 base，因此可以做到 infix completion，舊的版本可以用 ngram token filter 達到類似效果。

我最後使用 search-as-you-type，因為這個效果比較符合使用情境，設定步驟如下：

建立 mapping
```json
// PUT /<index>
{
    "mappings": {
        "properties" : {
            "completion_field" : {
                "type" : "search_as_you_type",
                "analyzer": "ik_max_word"
            }
        }
    }
}
```
建立 data
```json
// PUT /<index>/<id>

// request 1
{
  "completion_field": "甲狀腺腫大"
}
// request 2
{
  "completion_field": "甲狀腺凸眼症"
}
...
```
測試結果
```json
// GET /<index>/_search

// request
{
  "_source": ["completion_field"],
  "query": {
    "multi_match": {
      "query": "甲狀",
      "type": "best_fields", // 按照有對應到的順序計算
      "fields": [
        "completion_field"
      ]
    }
  }
}
// response
{
    ...
  "hits" : {
      ...
    "hits" : [
      {
        "_index" : "completion_field",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 0.8630463,
        "_source" : {
          "completion_field" : "甲狀腺腫大"
        }
      },
      {
        "_index" : "completion_field",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 0.8630463,
        "_source" : {
          "completion_field" : "甲狀腺凸眼症"
        }
      }
    ]
  }
}
```
前端隨便找一套看的順眼的 auto-completion library 套一下就好～這邊延用之前同義字的 analyzer，因為這樣自動完成出來的東西才不會被切的很奇怪。

上面大概說明怎麼快速建立一個具有同義字和自動完成功能的 Elasticsearch node，至於效果好不好得看字庫範圍夠不夠集中且多元，這塊很吃領域知識，這篇文章提供了「有」的部分，要「好」的話還有更多需要做的。
