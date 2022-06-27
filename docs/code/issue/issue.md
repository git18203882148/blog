---
editLink: false
date: '2022-06-22'
title: 'issue'
---
## 前言

在这里记录平时遇到的问题

服务器解压乱码问题

#### 问题描述

unzip解压中文文件名乱码 

#### 问题分析

由于中文的Windows使用的是GBK编码

而Linux默认使用UTF-8编码的

如果在Windows打包带中文文件的zip包或打包后的名字带中文

会乱码

#### 解决方法

通过命令处理：

```shell
unzip -O GBK *.zip 
```

