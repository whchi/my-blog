---
title: '[推薦] Database Pages'
date: 2023-07-04T21:28:04+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source

https://medium.com/@hnasr/database-pages-a-deep-dive-38cdb2c79eb5

# Summary
- Databases store data in fixed-size pages that contain tables, collections, rows, columns, indexes, sequences, documents and more. This allows for efficient read/write operations and the separation of the storage engine from the database frontend. Different databases use different page layouts.

- Pages are stored in a shared or buffer pool, where read/write operations take place. This pool of memory makes data retrieval and modification more efficient, as more data can be accessed or updated within a single I/O operation.

- Pages can hold different kinds of data depending on the database type. Row-store databases, column-store databases, document-based databases, and graph-based databases each pack their respective data types into pages in different ways to optimize performance.

- The size of pages affects the read/write speed and the metadata overhead. Small pages are faster to read/write, but their overhead cost can be high. Large pages can minimize metadata overhead but may result in higher cold read/write costs. Each database has its default page size.

- Pages are stored on disk usually in an array-like format within a single file per table or collection. The structure of a page in PostgreSQL, for example, includes a 24-byte page header, 4-byte ItemIds (pointers to the actual data), the data items themselves, and a variable length 'special' section applicable to B+Tree index leaf pages.
