---
title: '把 gsheet 當作 json api 使用'
date: 2020-01-07T14:56:44+08:00
draft: false
author: 'whchi'
type: 'posts'
tags: ['google app script']
summary: '有些事情做了才知道，比如改 wording'
---
改 wording 這種別人說了算的東西，就應該把責任推給別人，所以就有了這篇文章

google 有個東西叫 [google app script](https://developers.google.com/apps-script)可以在他旗下的產品裡寫外掛，這裡有份[tutorial](https://codelabs.developers.google.com/codelabs/apps-script-intro/#0)提供參考

## 直接切入主題
參考以下步驟
1. 建立sheet
2. 進入 script editor
![](/images/script-editor.png)
3. write code\
只需要你的 sheet id 即可\
https://docs.google.com/spreadsheets/d/{your-sheet-id}/edit#gid=0
> google app script有幾種類型的 script, 這裡用 web app
```js
// 發布後會有個 uri, get 他就進這邊
function doGet(e) {
    // init sheet object
    const qs = e.parameter.tab // https://webappuri/?tab=123, qs=123

    const spreadSheet = SpreadsheetApp.openById(
        "your-sheet-id"
    );
    //取得第一個 tab
    const sheet = spreadSheet.getSheets()[0];
    // 就跟 excel 一樣，A行~G行的第1列，google稱作 A1 notation
    const title = sheet.getRange("A1:G1").getValues()[0];
    // 最後一列, 空白也算
    const lastDataRowNumber = sheet.getLastRow();
    // 取得列裡面的值
    const rows = sheet
    .getRange("A2:G" + lastDataRowNumber)
    .getValues();

    // return as json
    return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(
        ContentService.MimeType.JSON)
}
function doPost(e){
    // post action here
}
// 其實就是 javascript
```
script editor 有提供中斷點進行 debug 如圖
![](/images/script-editor-debugger.png)
4. publish\
點擊上方的`publish::Deploy as web app`，存取權限選擇`Anyone,even anonymous`後發布\
會取得一個 uri，這串就直接把 sheet 內的東西做為 json 取回拉～

## 備註
一般帳號有 50000/day 的存取限制，建議可以搭配後端code避免 reach rate limit(假如流量真心多的話)
## References
* [google app script](https://developers.google.com/apps-script/overview)
* [google app script quotas](https://developers.google.com/apps-script/guides/services/quotas)
