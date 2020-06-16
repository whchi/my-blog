---
title: '在 laravel 中使用第三方登入並整合 Auth Facade'
date: 2020-06-16T23:16:10+08:00
draft: false
author: 'whchi'
tags: ['laravel']
summary: '覺得是很常見的需求'
---

在 legency 專案上要變換登入要考量的事很多，其中一個情況就是 blade 大量使用 Auth Facade 做 UI 的呈現變化，加上第三方登入都跟你 token 來 token 去，不熟 auth 還真不知道怎麼下手。

這邊提出在這種情況下比較無痛轉移的方法

在 laravel 中修改驗證時有幾個地方要改，以下分別列出並提供範例

* config/auth.php
```php
<?php
...
'providers' => [
    'users' => [
        'driver' => 'custom-driver',
    ]
]
...
```
* AuthServiceProvider.php

you can use `php artisan` to create provider
```php
<?php
public function boot() {
    ...
    Auth::provider('custom-driver', function ($app, array $config) {
        return new YourCustomAuthProvider();
    });
}
```
* YourCustomAuthProvider.php
```php
<?php
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\GenericUser;

class YourCustomAuthProvider implements \Illuminate\Contracts\Auth\UserProvider
{
    // implement all contrat
    // below is sample
    public function retrieveById($identifier)
    {
        return $this->getUser($identifier);
    }

    public function retrieveByToken($identifier, $token)
    {
        $user = $this->getUser($identifier);
        return isset($user['remember_token']) && $user['remember_token'] == $token ? $user : null;
    }

    public function updateRememberToken(Authenticatable $user, $token)
    {
        Session::put('remember_token', $token);
    }

    public function retrieveByCredentials(array $credentials)
    {
        $token = $this->getAccessToken();
        if(!$token) {
            // invalid token actions here
        }
        $data = $this->getUserData($token);
        return new GenericUser($data);
    }

    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        return yourCredentialsIsValidate() ? true: false;
    }
}
```
* YourLoginController.php
```php
<?php
...
use Illuminate\Auth\GenericUser;
...
public function login(Request $request)
{
    $data = getTokenAndUserDataFromThirdParty();

    // the key-point is here
    Auth::guard('web')->login(new GenericUser(['id' => $data['email']]))
    // then you keep your facade works as usual
}
```

*
# Reference
[official doc](https://laravel.com/docs/6.x/authentication#adding-custom-user-providers)
