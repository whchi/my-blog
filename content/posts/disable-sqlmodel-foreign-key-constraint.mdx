---
title: 'Disable sqlmodel foreign key constraint'
date: 2023-03-06T08:39:21+08:00
draft: false
author: 'whchi'
tags: ['python']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
---

When writing tests, you should follow the unit-of-work principle, which means separating data with each test. In Django, there is a method called `refresh_from_db` that can achieve this. However, in Flask or FastAPI, you need to implement it yourself. Here's how to do it with SQLModel (a SQLAlchemy wrapper):
* conftest.py
```py
from sqlalchemy.orm import sessionmaker
from sqlmodel import Session, SQLModel

@pytest.fixture(autouse=True)
def refresh_database(db: Session):
    SQLModel.metadata.create_all(engine)

    yield

    db.close()
    SQLModel.metadata.drop_all(engine)
```

If your SQLModel ORM includes foreign keys, creating or dropping all of them will result in a foreign key constraint issue.
```py
class Application(SQLModel, table=True):
    __tablename__ = 'applications'

    vendor_id: int | None = Field(default=None,
                                  nullable=True,
                                  foreign_key='vendors.id')
    category_id: int | None = Field(default=None,
                                    nullable=True,
                                    foreign_key='categories.id'
                                    )

    category: Optional['Category'] = Relationship(back_populates='applications')
    vendor: Optional['Vendor'] = Relationship(back_populates='applications')
```
As firstly mentioned, sqlmodel is a wrapper of sqlalchemy. It has parameters to pass sqlalchemy's parameters. SQLAlchemy can avoid this by using the `use_alter` flag.
```py
from sqlalchemy import Column, ForeignKey

class Application(SQLModel, table=True):
    __tablename__ = 'applications'

    vendor_id: int | None = Field(default=None,
                                  nullable=True,
                                  sa_column=Column(
                                      ForeignKey('vendors.id',
                                                 use_alter=True,
                                                 name='applications_vendor_id_fkey')))
    category_id: int | None = Field(default=None,
                                    nullable=True,
                                    sa_column=Column(
                                        ForeignKey(
                                            'categories.id',
                                            use_alter=True,
                                            name='applications_category_id_fkey')))

    category: Optional['Category'] = Relationship(back_populates='applications')
    vendor: Optional['Vendor'] = Relationship(back_populates='applications')
```

Then every thing works.
