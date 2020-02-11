---
title: 'Laravel Model 使用非預設主鍵'
date: 2020-02-11T21:56:10+08:00
draft: false
author: 'whchi'
tags: ['laravel']
summary: 'trace code 筆記'
---

最近遇到一個怪問題，用 laravel 時如果指定 `$primaryKey` 為其他非 auto-increment 的值時必需同時指定`$keyType`跟`$incrementing`才能 model  在使用時正常

比如說主鍵是 uuid 時要做以下設定才能正確執行，少一個都不能 work

```php
<?php
$primaryKey = 'uuid';
$keyType = 'string';
$incrementing = false;
```

追了一下 source code 終於理解原因，下面說明存取 model 物件時到底這些欄位對它的影響
## 存值
* Model.php

在這支約 `L682` 的地方有說明如果設定上有 `$incrementing` 的時候會使用`PDO::lastInsertId`來取的最後 insert 的 id
```php
<?php
// If the model has an incrementing key, we can use the "insertGetId" method on
// the query builder, which will give us back the final inserted ID for this
// table from the database. Not all tables have to be incrementing though.
$attributes = $this->getAttributes();
if ($this->getIncrementing()) {
    $this->insertAndSetId($query, $attributes);
}
```
該函數在 mysql 時是使用`LAST_INSERT_ID`來做，根據[mysql官方文件對該函數的說明](https://dev.mysql.com/doc/refman/5.7/en/information-functions.html#function_last-insert-id)可得知不管有無指定參數，回傳型別都會是 int，取回的欄位都是 auto_increment 的結果

```txt
With no argument, LAST_INSERT_ID() returns a BIGINT UNSIGNED (64-bit) value representing the first automatically generated value successfully inserted for an AUTO_INCREMENT column as a result of the most recently executed INSERT statement. The value of LAST_INSERT_ID() remains unchanged if no rows are successfully inserted.

With an argument, LAST_INSERT_ID() returns an unsigned integer.
```
因此只設定`$keyType`以及`$primaryKey`在 model 新增時取回的 id 就不會是預期的值，必須加上`$incrementing`才能正確取得回傳值
## 取值
model 在回傳的時候會去查看`$casts`裡面的東西並把它mapping起來作為回傳的 attributes，而在使用到的 Traits 裡面的裡面有去特別檢查`$incrementing`的設定，程式碼如下
* HasAttributes.php
```php
<?php
public function getCasts()
{
    if ($this->getIncrementing()) {
        return array_merge([$this->getKeyName() => $this->getKeyType()], $this->casts);
    }
    return $this->casts;
}
```
因此在單純設定`$keyType`和`$primaryKey`時取值是不會有問題的

## 結論
如果主 key 不是 laravel 預設型別，一定要同時設定上面提到的三個屬性才能確保 model 能正常 work
