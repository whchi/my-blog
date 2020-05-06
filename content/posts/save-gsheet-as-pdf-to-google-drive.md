---
title: '轉存 gsheet 成 pdf 並存入 google drive'
date: 2020-05-06T23:00:12+08:00
draft: false
author: 'whchi'
tags: ['google app script']
summary: '感覺很有機會用就紀錄在這'
---
```js
function doGet() {
    exportAsPDF(pdfName);
}

function exportBlob(blob, fileName) {
  blob = blob.setName(fileName)
  var folderId = 'your-google-drive-folder-id';
  var pdfFile = DriveApp.getFolderById(folderId).createFile(blob)
}

function exportAsPDF(name) {
  var SpreadSheet = SpreadsheetApp.openById('your-id')
  var Sheet = SpreadSheet.getSheetByName(name)

  var lastDataRowNumber = Sheet.getLastRow();
  var range = Sheet.getRange("A1:F" + lastDataRowNumber);

  var blob = getAsBlob(SpreadSheet.getUrl(), Sheet, range)
  exportBlob(blob, name)
}

function getAsBlob(url, sheet, range) {
  var rangeParam = ''
  var sheetParam = ''
  if(range){
    // data row-col
    rangeParam =
      '&r1=' + (range.getRow() - 1)
      + '&r2=' + range.getLastRow()
      + '&c1=' + (range.getColumn() - 1)
      + '&c2=' + range.getLastColumn()
  }

  if (sheet) {
    // specific tab
    sheetParam = '&gid=' + sheet.getSheetId()
  }

  var exportUrl = url.replace(/\/edit.*$/, '')
      + '/export?exportFormat=pdf&format=pdf'
      + '&size=LETTER'
      + '&portrait=true'
      + '&fitw=true'
      + '&top_margin=0.75'
      + '&bottom_margin=0.75'
      + '&left_margin=0.7'
      + '&right_margin=0.7'
      + '&sheetnames=false&printtitle=false'
      + '&pagenum=false'
      + '&gridlines=true'
      + '&fzr=FALSE'
      + sheetParam
      + rangeParam

  var response = UrlFetchApp.fetch(exportUrl, {
    headers: {
      Authorization: 'Bearer ' +  ScriptApp.getOAuthToken(),
    },
  })

  return response.getBlob()
}
```
