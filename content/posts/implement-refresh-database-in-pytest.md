---
title: 'Implement refresh database using pytest'
date: 2023-06-03T16:35:28+08:00
draft: false
author: 'whchi'
tags: ['']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

When writing tests, there is an important concept called "unit of work," which states that every test should only focus on testing one specific thing, usually a function or a class. Additionally, each test should be independent, meaning that **the result of one test should not impact the result of another test**. Therefore, it is crucial to ensure that the database is clean before each test. In this article, I will demonstrate how to implement a database refresh using pytest.

There are 5 scopes in pytest:
- `function`: the default scope, the fixture is destroyed at the end of the test.
- `class`: the fixture is destroyed during `def teardown` of the last test in the class.
- `module`: the fixture is destroyed during teardown of the last test in the module(single_test_file.py).
- `package`: the fixture is destroyed during teardown of the last test in the package(single/folder).
- `session`: the fixture is destroyed at the end of the test session.(until the command line exits)

So, we can use the function scope to rollback and truncate all tables of the database after every test, and use the session scope to drop all tables after all tests have ended. This approach ensures that the database schema remains unchanged and prevents tests from failing.

Here's how to implement it using SQLAlchemy:

```py
# conftest.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


Base = declarative_base()

engine = create_engine(
    url='your-connection-string',
    echo=True,
    future=True,
)
@pytest.fixture(autouse=True, scope='session')
def db_engine():
    Base.metadata.create_all(engine)

    yield engine # db engine to the test session

    Base.metadata.drop_all(engine)

@pytest.fixture(autouse=True, scope='function')
def db_session(db_engine):
    session_local = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=db_engine,
        expire_on_commit=False,
    )()

    yield session_local # every test will get a new db session

    session_local.rollback() # rollback the transactions

    # truncate all tables
    for table in reversed(Base.metadata.sorted_tables):
        session.execute(f'TRUNCATE {table.name} CASCADE;')
        session.commit()

    session_local.close()
```

That is. Now, you can use `db_session` fixture in your test file to get a new db session for every test.

```py
def test_something(db_session):
    # do something
    ...
```

Also, you can refresh your redis cache in the same way if you need.

```py
import redis

@pytest.fixture(autouse=True, scope='session')
def refresh_cache():
    cache = redis.Redis(
        host='localhost',
        port=6379,
        db=0)

    yield cache

    cache.flushdb()
```
