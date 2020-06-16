---
title: '在 laravel 中使用第三方登入並整合 Auth Facade'
date: 2020-06-16T23:16:10+08:00
draft: false
author: 'whchi'
tags: ['laravel']
summary: '覺得是很常見的需求，先記下來'
---

在 laravel 中修改驗證時有幾個地方要改，以下分別列出

* config/auth.php
```php
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
public function boot() {
    ...
    Auth::provider('custom-driver', function ($app, array $config) {
        return new YourCustomAuthProvider();
    });
}
```
* YourCustomAuthProvider.php
```php
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
...
use Illuminate\Auth\GenericUser;
...
public function login(Request $request)
{
    $data = getTokenAndUserDataFromThirdParty();

    // the point is here
    Auth::guard('web')->login(new GenericUser(['id' => $data['email']]))
    // then you can run your code with Auth Facade easily
}
```

*
# Reference
[official doc](https://laravel.com/docs/6.x/authentication#adding-custom-user-providers)
