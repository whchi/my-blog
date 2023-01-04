---
title: 'Laravel Like Filesystem Using Python'
date: 2023-01-04T13:47:17+08:00
draft: false
author: 'whchi'
tags: ['python']
summary: 'good artists copy'
preview_figure: ''
preview_figcaption: ''
---

This is a tutorial of how to make a laravel's filesystem-like feature in python

# 1. A interface
We can create interface by python's `abc` module
```py
import abc
class FileSystemManager(abc.ABC):
    _instance: Any = None

    def __new__(cls, *args: Any) -> 'FileSystemManager':
        # use singleton for saving memory usage
        if not cls._instance:
            cls._instance = super(FileSystemManager, cls).__new__(cls)
        return cls._instance

    @classmethod
    @abc.abstractmethod
    def register(cls) -> 'FileSystemManager':
        # register new disk provider
        ...

    @abc.abstractmethod
    def write(self, filepath: str) -> None
        ...

    # and other file related methods like read,mkdir,rmdir...
```
# 2. A caller like laravel's Storage Facade
Then we wants to interactive with the contract like laravel's `Storage::disk()`, so make a `Storage` class with `@classmethod`
```py
class Storage:
    # provider map, acts like factory
    instances = {'local': LocalProvider, 's3': S3Provider}

    @classmethod
    def disk(cls, driver: str = 'file'):
        return cls.instances[driver].register()
```
# 3. Implement providers
As you can see at second step, there's two providers to implement
### 1. LocalProvider
```py
import os

from . import FileSystemManager

class LocalProvider(FileSystemManager):

    def __init__(self) -> None:
        self.root = '/path/to/root/storage'

    @classmethod
    def register(cls) -> 'LocalProvider':
        return cls()

    def read(self, filepath: str) -> str | None:
        return FileUtil.read(f'{self.root}{filepath}')

    def write(self, filepath: str, content: Any, **kwargs: str | None) -> None:
        if not isinstance(content, str):
            raise TypeError('content MUST be a str')

        FileUtil.write(f'{self.root}{filepath}', content)

    def exists(self, filepath: str) -> bool:
        return FileUtil.exists(f'{self.root}{filepath}')

    def url(self, filename: str) -> str:
        return f'https://{your_host}/public/{filename}'

    def make_dirs(self, filepath: str) -> None:
        FileUtil.make_dirs(f'{self.root}{filepath}')

    def remove_file(self, filepath: str) -> None:
        FileUtil.remove_file(filepath)

    def remove_dir(self, dir_path: str) -> None:
        FileUtil.remove_dir(dir_path)

```
### 2. S3Provider
```py
import logging

from . import FileSystemManager
import boto3
from botocore.exceptions import ClientError


class S3Provider(FileSystemManager):

    def __init__(self) -> None:
        config = {
            'id': 'AWS_ACCESS_KEY_ID',
            'secret': 'AWS_SECRET_ACCESS_KEY',
            'region': 'AWS_S3_REGION',
            'bucket': 'AWS_S3_BUCKET'
        }
        self.config = config
        self.s3 = boto3.client('s3',
                               aws_access_key_id=config['id'],
                               aws_secret_access_key=config['secret'],
                               region_name=config['region'])

    @classmethod
    def register(cls) -> 'S3Provider':
        return cls()

    def read(self, filepath: str) -> str | None:
        s3_obj = self.s3.get_object(Bucket=self.config['bucket'], Key=filepath)
        response = s3_obj['Body'].read()
        return response.decode('utf-8')

    def write(self, filepath: str, content: Any, **kwargs: str | None) -> None:
        if isinstance(content, str):
            raise TypeError('content MUST be types in BytesIO|StringIO')

        self.s3.upload_fileobj(
            content,
            self.config['bucket'],
            filepath,
            ExtraArgs={
                'ACL': 'public-read',
                'ContentType': kwargs.get('content_type', 'application/octet-stream')
            })

    def exists(self, filepath: str) -> bool:
        try:
            response = self.s3.head_object(Bucket=self.config['bucket'], Key=filepath)
            return response['ResponseMetadata']['HTTPStatusCode'] == 200
        except ClientError as e:
            logging.info(e)
            return False

    def url(self, filename: str) -> str:
        return f'https://{self.config["bucket"]}.s3.{self.config["region"]}.amazonaws.com/{filename}'

    def make_dirs(self, filepath: str) -> None:
        raise NotImplementedError(
            f'method make_dirs not implemented in {self.__class__}')

    def remove_file(self, filepath: str) -> None:
        self.s3.delete_object(Bucket=self.config['bucket'], Key=filepath)

    def remove_dir(self, dir_path: str) -> None:
        if dir_path[-1] != '/':
            raise ValueError('dir_path MUST endswith "/"')

        response = self.s3.list_objects(Bucket=self.config['bucket'], Prefix=dir_path)
        if 'Contents' in response:
            for obj in response['Contents']:
                self.remove_file(obj['Key'])

```
# 4. start use
After implemented all of them, we can call it like laravel filesystem
```py
Storage.disk('s3').read(...)
Storage.disk('local').write(..., ...)
```
