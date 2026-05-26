---
title: 'FastAPI 異步處理最佳實踐指南'
date: 2025-07-04T13:51:04+08:00
draft: false
author: 'whchi'
tags: ['fastapi']
summary: ''
preview_figure: ''
preview_figcaption: ''
preview_image: ''
toc: true
---
## FastAPI 的異步處理機制

FastAPI 框架無論是否明確指定 `async`，都會以異步方式運行。框架會根據函數的宣告方式進行不同的處理：

### 執行方式差異

- **`def` 宣告的函數**：會被丟到獨立的 thread pool 中執行
- **`async def` 宣告的函數**：會在 event loop 中執行
- **一般同步函數**：會被放到 thread pool 中執行（取決於 worker 和 thread 數量）

## 關鍵原則：避免阻塞 Event Loop

### ⚠️ 重要警告

**不要在 `async def` 函數中使用同步（非 await）的 I/O 操作，這會讓處理變成序列化執行，嚴重降低性能。**

### 為什麼會發生阻塞？

當你使用 `await` 時，Python 會暫停當前協程的執行，直到被等待的協程完成。在協程被暫停期間，Python 的 event loop 可以處理其他協程。

但如果在 `async def` 函數中進行同步 I/O 操作而不使用 `await`：

1. Event loop 無法暫停（suspend）該任務
2. 其他請求必須等待當前操作完成
3. 造成看似序列化的執行模式
4. 大量請求堆積可能導致記憶體使用增加

### 官方文檔說明

> *When you declare a path operation function with normal `def` instead of `async def`, it is run in an external **threadpool** that is then awaited, instead of being called directly (as it would block the server).*

## 何時使用 Async/Await

### 適合使用的場景

- 資料庫 I/O 操作
- 網路請求和 Socket 通訊
- 文件讀寫操作
- 其他 I/O 密集型任務

### 不適合使用的場景

- CPU 密集型任務（考慮使用 multiprocessing 或 threading）
- 調用不支援 `await` 的第三方函數庫
- 簡單的計算或資料處理

## 最佳實踐範例

### ❌ 錯誤做法

```python
@app.get("/bad")
async def bad_endpoint():
    # 這會阻塞 event loop
    result = some_sync_db_call()  # 沒有 await
    return result

@app.get("/also-bad")
async def also_bad_endpoint():
    # 在 async 函數中使用同步的第三方庫
    data = requests.get("https://api.example.com")  # 阻塞操作
    return data.json()
```

### ✅ 正確做法

```python
@app.get("/good-async")
async def good_async_endpoint():
    # 使用支援 async 的資料庫操作
    result = await some_async_db_call()
    return result

@app.get("/good-sync")
def good_sync_endpoint():
    # 使用 def 讓 FastAPI 在 thread pool 中執行
    result = some_sync_db_call()
    return result

@app.get("/good-mixed")
def good_mixed_endpoint():
    # 第三方同步庫在 thread pool 中執行
    data = requests.get("https://api.example.com")
    return data.json()
```

## 依賴注入的考量

在 FastAPI 的 `Depends` 中也要遵循相同原則：

```python
# ❌ 錯誤
async def bad_dependency():
    return some_sync_operation()  # 阻塞

# ✅ 正確
async def good_async_dependency():
    return await some_async_operation()

# ✅ 也正確
def good_sync_dependency():
    return some_sync_operation()  # 在 thread pool 中執行
```

## 總結

1. **理解執行機制**：`def` 使用 thread pool，`async def` 使用 event loop
2. **避免混用**：不要在 `async def` 中進行同步 I/O 操作
3. **選擇適當方式**：
   - 有真正的異步 I/O 需求時使用 `async def`
   - 使用同步函數庫時使用 `def`
4. **保持一致性**：在 path operations 和 dependencies 中保持一致的模式

所謂的「效能」比較好指的是「響應能力」與「交互性」好，至於 CPU time 不會有什麼差異，遵循這些原則可以確保你的 FastAPI 應用獲得最佳的併發性能，避免不必要的阻塞和資源浪費。
