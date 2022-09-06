---
title: 'Difference Between Bind and Singleton'
date: 2020-03-12T16:50:27+08:00
draft: false
author: 'whchi'
tags: ['Laravel']
summary: 'just note it'
---
### bind vs singleton
* bind

for reusable class or object
* singleton

need only one instance through your application call

**example**

```php
<?php
class TestClass
{
    protected $value = 0;

    public function increase()
    {
        $this->value++;

    return $this->value;
    }
}
###
$app->bind('klass1', TestClass::class);
$app->singleton('klass2', TestClass::class);
###
app('klass1')->increase(); // 1
app('klass1')->increase(); // 1
app('klass1')->increase(); // 1
---
app('klass2')->increase(); // 1
app('klass2')->increase(); // 2
app('klass2')->increase(); // 3
```
### extra information
`Facade` makes you easily use your service with `singleton` because of `resolveFacadeInstance`, if you want to use it with `bind` you can call `clearResolvedInstance` in your facade.

**example**
```php
<?php
protected static function getFacadeAccessor()
{
    self::clearResolvedInstance(YourService::class);

    return YourService::class;
}
```

