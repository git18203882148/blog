---
title: JS查询URL字符串中的参数
---


原生JS中的 `location.search` 可以返回从问号到 URL 末尾的所有内容，但是访问其中的每个字符串参数却很麻烦。这时候，可以创建一个函数，用以解析查询字符串

``` javascript
function getQueryStringArgs(){
    //取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),

    //保存数据的对象
    args = {},

    //取得每一项
    items = qs.length ? qs.split("&") : [],
    item = null,
    name = null, 
    value = null,
    //在 for 循环中使用
    i = 0,
    len = items.length;
    //逐个将每一项添加到 args 对象中
    for (i=0; i < len; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
} 
```
这样`getQueryStringArgs()`方法就会返回包含所有URL参数的一个对象。

>参考文献
JavaScript高级程序设计（第3版）P207