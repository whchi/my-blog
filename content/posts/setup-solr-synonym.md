---
title: '設定 solr 同義詞'
date: 2019-09-05T11:55:11+08:00
draft: true
author: 'whchi'
tags: ['solr']
summary: '使用 docker 建立 solr 4.10 並用 mmseg 切字'
---
將說明從安裝到設定的過程
> 現在 solr 已經到 8.2 了, 但因為歷史包袱所以還是用 4.10
# 設定
在本地建立core folder, 結構圖如下
```sh
cores
└── mycore
    ├── conf
    │   ├── _rest_managed.json
    │   ├── dataimport.properties
    │   ├── db-data-config.xml
    │   ├── protwords.txt
    │   ├── schema.xml
    │   ├── solrconfig.xml
    │   ├── stopwords.txt
    │   ├── stopwords_en.txt
    │   └── synonyms.txt
    ├── core.properties
    └── data/
```
主要說明幾個檔案
## core.properties
告訴 solr 要讀取的 core 資訊, 範例參考
```properties
name=mycore
config=solrconfig.xml
schema=schema.xml
dataDir=data
```
## solrconfig.xml
增加 dataimport
```xml
<requestHandler name="/dataimport" class="org.apache.solr.handler.dataimport.DataImportHandler">
    <lst name="defaults">
        <str name="config">db-data-config.xml</str>
    </lst>
</requestHandler>
```
## db-data-config.xml
設定要 import 的 data 的 query, 範例參考
```xml
<dataConfig>
    <dataSource type="JdbcDataSource" driver="com.mysql.jdbc.Driver" url="jdbc:mysql://localhost:3306/test" user="myusername" password="mypassword"/>
        <document name="mydocument">
        <entity name="item" query="SELECT * FROM your_table">
            <field column="ID" name="id" />
            <field column="SNO" name="no" />
            <field column="SNAME" name="name" />
            <field column="STYPE" name="type" />
        </entity>
    </document>
</dataConfig>
```
## schema.xml

```xml
<fields>
    <field name="name" type="text_syn" indexed="true" stored="true" required="true" multiValued="false" />
    <field name="type" indexed="false" type="string" stored="true" required="false" multiValued="false" />
    <field name="no" indexed="true" type="int" stored="true" required="false" multiValued="false" />
    <field name="id" indexed="true" type="int" stored="true" required="false" multiValued="false" />
</fields>
...
<fieldType name="text_syn" class="solr.TextField" autoGeneratePhraseQueries="true">
    <analyzer>
        <tokenizer class="com.chenlb.mmseg4j.solr.MMSegTokenizerFactory" mode="complex" dicPath="/opt/solr-multicore/dics"/> <!-- 使用mmseg跑同義詞 tokenizer -->
        <charFilter class="solr.HTMLStripCharFilterFactory"/> <!-- 對token做html strip -->
        <filter class="solr.LowerCaseFilterFactory"/> <!-- 全部token轉小寫 -->
        <filter class="solr.StopFilterFactory" ignoreCase="true" words="stopwords.txt"/> <!-- token參考停用字, 不一定要 -->
    </analyzer>
</fieldType>
```
## synonym.txt
```txt
# , 表示同等意思
# => 表示用左側搜會用右側搜
# 但因為會先跑 token, 所以有要做同意的字也要把他設進 words.dic 裡面
台灣,臺灣
流行性感冒 => 流感
TV => Taiwan-Value
```
# 使用 docker-compose 安裝
上面的設定完成後跑下面的`docker-compose.yml`進行安裝, 附上相關 jar 的載點\
[mmseg4j-core-1.10.0.jar](https://mvnrepository.com/artifact/com.chenlb.mmseg4j/mmseg4j-core/1.10.0)、
[mmseg4j-solr-2.2.0.jar](https://mvnrepository.com/artifact/com.chenlb.mmseg4j/mmseg4j-solr/2.2.0)、
[mysql-connector-java-5.1.47.jar](https://mvnrepository.com/artifact/mysql/mysql-connector-java/5.1.47)、
[solr-dataimporthandler-4.10.4.jar](https://mvnrepository.com/artifact/org.apache.solr/solr-dataimporthandler/4.10.4)、
[solr-dataimporthandler-extras-4.10.4.jar](https://mvnrepository.com/artifact/org.apache.solr/solr-dataimporthandler-extras/4.10.4)
* 關於 mysql 設定

參考 [docker mysql](https://hub.docker.com/_/mysql)
* 關於字典檔

以 `.dic` 結尾
|檔案|說明|
|:--|:--|
|units.dic|單位詞(年月日時分秒...)|
|chars.dic|單一串字典|
|words.dic|想要被切出來的詞庫, 比如說「三生有幸」原本可能是「三」「生」「有」「幸」, 加入後就會直接被切成「三生有幸」|
|wordsXXXX.dic|XXXX自定義, 主要是切開管理字典檔|
除了最後一項尚上述的字典都有開源載點
* docker-compose.yml

{{< highlight yaml >}}
version: '3'
services:
  solr:
    image: geerlingguy/solr:4.10.4
    container_name: local_solr4
    ports:
      - '8983:8983'
    restart: always
    volumes: [
        './cores/mycore:/var/solr/mycore:rw', # 保存core
        './jars/mmseg4j-core-1.10.0.jar:/opt/solr/example/solr-webapp/webapp/WEB-INF/lib/mmseg4j-core-1.10.0.jar',
        './jars/mmseg4j-solr-2.2.0.jar:/opt/solr/example/solr-webapp/webapp/WEB-INF/lib/mmseg4j-solr-2.2.0.jar',
        './jars/mysql-connector-java-5.1.47.jar:/opt/solr/example/solr-webapp/webapp/WEB-INF/lib/mysql-connector-java-5.1.47.jar',
        './jars/solr-dataimporthandler-4.10.4.jar:/opt/solr/example/solr-webapp/webapp/WEB-INF/lib/solr-dataimporthandler-4.10.4.jar',
        './jars/solr-dataimporthandler-extras-4.10.4.jar:/opt/solr/example/solr-webapp/webapp/WEB-INF/lib/solr-dataimporthandler-extras-4.10.4.jar',
        './dict:/opt/solr-multicore/dics/' # 自定義字典檔, 可以去開源詞庫抓獲自行定義
    ]
    command:
      [
        '/opt/solr/bin/solr',
        'start',
        '-p',
        '8983',
        '-s',
        '/var/solr',
        '-m',
        '1024m',
        '-f',
      ]
  mysql:
    image: mysql:5.7
    volumes:
    - ./mysql/var/lib/mysql:/var/lib/mysql
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: yes
    ports:
    - "3306:3306"
    privileged: true
{{< / highlight >}}
# 測試
安裝成功後開啟瀏覽器輸入`localhost:8983` 會看到 solr 的 UI, 選擇`mycore`跑完`full-import`後點擊`Analysis`頁籤\
於選擇建立的欄位進行測試如圖
![](images/solr-analysis-field.png)
輸入有寫在 synonym.txt 裡面的字串進行分析, 有看到如下圖結果表示成功
![](images/solr-synonym-setup-success.png)
# References
* [碼上會！ mmseg4j 中文斷詞java 實作 (55行)](http://function1122.blogspot.com/2010/10/mmseg4j-java-55.html)
* [solr filter](https://lucene.apache.org/solr/guide/6_6/about-filters.html)
* [solr tokenizer](https://lucene.apache.org/solr/guide/6_6/tokenizers.html#tokenizers)
