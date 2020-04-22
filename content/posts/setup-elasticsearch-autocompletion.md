---
title: '設定 Elasticsearch 自動完成'
date: 2020-04-22T17:36:40+08:00
draft: false
author: 'whchi'
tags: ['elasticsearch']
summary: '使用 elasticsearch 7.6.2'
---

最近幫公司的搜尋實現自動完成功能，筆記一下

自動完成直覺想到的關聯是「建議」以及「打字即呈現」，在 Elasticsearch 官方文件找的話會有`Suggester`、`search as you type`等關鍵字，以下分別說明兩者設定方式與差異
> 這裡假設已經有安裝 ik 分詞器，還沒裝的可以餐考 [我之前的文章](/posts/setup-elasticsearch-synonym/)
# 設定方式
## Suggester
官方提到共有四種類型如下

|名稱|描述|
|:--|:--|
|Term|用 [edit distance](https://zh.wikipedia.org/wiki/%E7%B7%A8%E8%BC%AF%E8%B7%9D%E9%9B%A2) 為算法基礎（顧名思義，某個字詞改變多少字元就能轉變為另個字詞），基於 analyze 過的單一 term 給予建議，不考慮 term 之間的關係。|
|Phrase|基於前者的基礎上考慮其關係，通常能提供更符合語意的結果。|
|Completion|針對 **auto completion** 的應用場景，其原理是將 token 編碼成 FST 後放在索引裡，由於是在 memory 因此回應速度很快，**不過因其資料結構限制所以只能做 prefix 查詢**|
|Context|是前者的進階使用，由於自動完成有時需要考慮情境（比如輸入 star 跑出 coffee，因為 starbuck 的存在）而出現的類型|


這邊只介紹 Completion Suggester 的部分
1. set mapping
```sh
PUT <index>
{
    "mappings": {
        "properties" : {
            "suggest" : {
                "type" : "completion",
                "analyzer": "ik_max_word"
            },
            "title" : {
                "type": "keyword"
            }
        }
    }
}
```
2. add data to suggest

```sh
PUT <index>/_doc/1?refresh
{
    "suggest" : {
        "input": [ "甲狀腺腫大", "甲狀腺凸眼症" ],
    }
}
```
3. get completion suggest
```sh
POST <index>/_search?pretty
{
    "suggest": {
        "_doc" : {
            "prefix" : "甲",
            "completion" : {
                "field" : "suggest"
            }
        }
    }
}
##### response #####
{
    ...
  "suggest": {
    "_doc" : [ {
        ...
      "options" : [ {
        "text" : "甲狀腺腫大",
        "_index": "music",
        "_type": "_doc",
        "_id": "1",
        "_score": 1.0,
        "_source": {
          "suggest": ["甲狀腺腫大", "甲狀腺凸眼症"]
        }
      } ]
    } ]
  }
}
```
可以直接拿 _source 裡面的東西或是 text 作為 api 回傳的資料
## search_as_you_type
這是 7.2 之後才推出的欄位，使用 ngram 為基礎並打造的自動完成 field type，因此**可以做到 infix 自動完成**。\
搜尋 `edge_ngram auto completion elasticsearch`可以找到7.2之前的版本大概都是怎麼完成 infix 的
1. set mapping
```sh
PUT <index>
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
2. update index
```sh
PUT <index>/_doc/1?refresh
{
  "completion_field": "甲狀腺腫大"
}
PUT <index>/_doc/2?refresh
{
  "completion_field": "甲狀腺凸眼症"
}
```
3. get result
```sh
GET my_index/_search
{
  "_source": ["completion_field"],
  "query": {
    "multi_match": {
      "query": "甲狀",
      "type": "best_fields", # 按照有對應到的順序計算
      "fields": [
        "completion_field"
      ]
    }
  }
}
##### response #####
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
_source 裡面的就是結果\
{{< figure
src="/images/auto-completion-result.png"
title="呈現結果示意圖"
caption="呈現結果示意圖">}}
# 補充： analyzer 是什麼
> Analyzer = Character Filter + Tokenizer + Token Filter

|名稱|簡介|
|:--|:--|
|Character Filter|針對原始文件進行處理，例如：去除HTML tag，一個 analyzer 可設定多個 char_filter|
|Tokenizer|將前者的結果依據規則切分 token，比如以空白切分的 `whitespace`，必須要有一個 tokenizer|
|Token Filter|將前者個結果進行增修（stop、lowercase、synonym...），但不可移動其位置，可設定多個 filter|
## Reference
* [elasticsearch suggesters](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html)
* [FST 深入剖析](https://www.shenyanchao.cn/blog/2018/12/04/lucene-fst/)
* [elasticsearch 7.0 breaking changes](https://www.elastic.co/guide/en/elasticsearch/reference/current/breaking-changes-7.0.html#breaking_70_mappings_changes)
* [how-to-wisely-combine-shingles-and-edgengram-to-provide-flexible-full-text-search](https://stackoverflow.com/questions/30666371/how-to-wisely-combine-shingles-and-edgengram-to-provide-flexible-full-text-search)
* [analyzer-anatomy](https://www.elastic.co/guide/en/elasticsearch/reference/7.x/analyzer-anatomy.html)
