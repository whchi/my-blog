---
title: '如何限制 python json api 格式'
date: 2023-03-11T11:35:55+08:00
draft: false
author: 'whchi'
tags: ['python']
summary: 'use pydantic, the world is better'
preview_figure: ''
preview_figcaption: ''
---

# summary
Always use [pydantic](https://docs.pydantic.dev/) module

# content
API design can be a challenging task, particularly when it comes to deciding on the appropriate output format. One common guide for designing JSON APIs is the simple specification provided by the following resource: https://github.com/omniti-labs/jsend.

However, it can be difficult to ensure that team members consistently adhere to these rules, which can require substantial time investment for reviewing pull requests.

To promote uniformity in API formatting, the most effective strategy may be to incorporate the formatting rules directly into your code. In the following example, I will illustrate how this can be accomplished using Python.

There's a static type checking module called `pydantic` which enforces type hints at runtime, and provides user friendly errors when data is invalid.

Below are examples of how this can be done using Python in jsend.

* response example
```py
from enum import Enum
from typing import Generic, List, TypeVar

from pydantic import BaseModel, Field, validator
from pydantic.generics import GenericModel

T = TypeVar('T')

class ResponseStatusEnum(str, Enum):
    SUCCESS = 'success'
    FAIL = 'fail'
    ERROR = 'error'

class ResponseBaseModel(GenericModel, Generic[T]):
    data: T | None = None
    message: str | None = ''
    status: str = ResponseStatusEnum.success

    class Config:
        use_enum_values = True
```

sometimes you will need to return data with pagination, here's the example

* paginate response example
```py

class PageModel(GenericModel, Generic[T]):
    items: List[T] = []
    total: int
    current_page: int
    last_page: int | None
    prev_page: int | None
    next_page: int | None
    per_page: int

class PaginateResponseBaseModel(GenericModel, Generic[T]):
    data: PageModel[T]
    message: str | None = ''
    status: ResponseStatusEnum = ResponseStatusEnum.SUCCESS

    class Config:
        use_enum_values = True

```

* to use it(FastAPI)

```py
from datetime import datetime

class ExampleEntity(BaseModel):
    id: int
    name: str
    age: int
    nick_name: str | None
    created_at: datetime | None = None
    updated_at: datetime | None = None

class GetExampleResponse(ResponseBaseModel[ExampleEntity]):
    data: ExampleEntity

class GetPaginateExamplesResponse(PaginateResponseBaseModel[ExampleEntity]):
    data: PageModel[ExampleEntity]

router = APIRouter()

# {data: {id, name, age, created_at, updated_at}, message, status}
@router.get('/examples/{id}')
def get_example(id) -> GetExampleResponse:
    """
    Returns:
        json: {
            data: { id, name, age, created_at, updated_at },
            message,
            status
        }
    """
    data = repo.get_examples(id)
    return GetExampleResponse(data=data)

@router.get('/paginate-examples/{id}')
def get_examples(id, page:int = 1, per_page: int = 1) -> GetPaginateExamplesResponse:
    """
    Returns:
        json: {
            data: {
                items: [{id, name, age, created_at, updated_at}],
                total,
                current_page,
                last_page,
                prev_page,
                next_page,
                per_page,
            },
            message,
            status
        }
    """
    data = repo.get_examples_with_paginate(id, page, per_page)
    return GetPaginateExamplesResponse(data=data)

```

Then, all response will be restricted to the formats

# references
* [pydantic](https://docs.pydantic.dev/)
* [typing](https://docs.python.org/3/library/typing.html)


