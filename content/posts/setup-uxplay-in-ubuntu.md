---
title: '在 Ubuntu 上設定 Uxplay'
date: 2024-11-10T14:54:33+08:00
draft: false
author: 'whchi'
tags: ['']
summary: ''
preview_figure: ''
preview_figcaption: ''
---
Uxplay 是一套開源的 screen sharing 軟體，可以在你想投影的機器上設定後使用 iphone/mac 透過 wifi 直接投影

安裝步驟很簡單
1. 安裝必要的編譯相依套件:
```sh
sudo apt install build-essential pkg-config cmake
sudo apt install libssl-dev libplist-dev
sudo apt install libavahi-compat-libdnssd-dev
sudo apt install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev
sudo apt install libx11-dev
```
1. 安裝必要的 GStreamer 插件:
```sh
sudo apt install gstreamer1.0-plugins-base
sudo apt install gstreamer1.0-libav
sudo apt install gstreamer1.0-plugins-good
sudo apt install gstreamer1.0-plugins-bad
sudo apt install gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-x
sudo apt install gstreamer1.0-vaapi  # 如果有 Intel/AMD 顯卡
sudo apt install gstreamer1.0-tools   # 用於檢查 GStreamer 安裝狀態
```
1. 下載並編譯 UxPlay
```sh
git clone https://github.com/FDH2/UxPlay

cd UxPlay

cmake .
make
sudo make install
```
4. 確認並啟動 Avahi daemon
```sh
systemctl status avahi-daemon
sudo systemctl start avahi-daemon
sudo systemctl enable avahi-daemon
```
5. 如果有防火牆,需要開啟必要的端口
```sh
# mDNS
sudo ufw allow 5353/udp

# UxPlay(例如使用 35000 開始的三個連續端口)
sudo ufw allow 35000:35002/tcp
sudo ufw allow 35000:35002/udp
```
6. 開始執行
```sh

# 基本執行
uxplay

# 或指定端口執行
uxplay -p 35000

# 使用全螢幕模式
uxplay -fs

# 如果有問題,可以啟用除錯模式
uxplay -d
```
您也可以直接把設定寫入 `~/.uxplayrc` 中，下次只要直接 `uxplay` 就能使用
```sh
echo "h265
vs \"waylandsink fullscreen=true\"" > ~/.uxplayrc
```

查看 `XDG_SESSION_TYPE`
```sh
echo $XDG_SESSION_TYPE
```

啟用後使用 mac 的 screen mirroning 功能就能看到你啟用的 Uxplay 裝置

