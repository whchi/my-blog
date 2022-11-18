---
title: '在 mac os 12.6 上安裝 ruby 2.6'
date: 2022-10-07T10:08:47+08:00
draft: false
author: 'whchi'
tags: ['ruby']
summary: '沒事不要亂升級本地開發環境'
preview_figure: ''
preview_figcaption: ''
---
最近在寫 ruby，因為案子有切版本的需求就用了 `rbenv` 做不同版本環境切割

沒想到切一切爛掉所以重罐整個環境，結果就炸了

每次重灌時都跑出這種錯誤
```
linking shared-library libruby.2.6.dylib
Undefined symbols for architecture arm64:
  "__mh_execute_header", referenced from:
      _rb_dump_backtrace_with_lines in addr2line.o
ld: symbol(s) not found for architecture arm64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [libruby.2.6.dylib] Error 1
make: *** Waiting for unfinished jobs....
```

參考幾篇文章後發現問題出在 xcode command line tool 14.0 在編譯 ruby 2.6.x 時會有問題

最後安裝 13.4 就搞定了，解法如下
# solution
1. 找出 command line tool 安裝路徑 `xcode-select -p`

2. `sudo rm -rf /path/to/commandlinetool`

3. go to apple developer to download Command Line Tools for Xcode 13.4, [link](https://download.developer.apple.com/Developer_Tools/Command_Line_Tools_for_Xcode_13.4/Command_Line_Tools_for_Xcode_13.4.dmg)

4. install

就搞定拉

# References
* https://github.com/asdf-vm/asdf-ruby/issues/301
* https://www.rubyonmac.dev/how-to-install-ruby-on-macos-12-6-apple-silicon
