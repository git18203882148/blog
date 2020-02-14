---
title: JS获得浏览器的各种高度与宽度
---

```javascript

function Query () {
    //1、浏览器窗口大小
    console.log("浏览器（显示网页）窗口的宽：window.innerWidth ->"+window.innerWidth) ;
    console.log("浏览器（显示网页）窗口的高：window.innerHeight ->"+window.innerHeight) ;
    console.log("浏览器的宽：window.outerWidth ->"+window.outerWidth) ;
    console.log("浏览器的高：window.outerHeight ->"+window.outerHeight) ;
    //2、dom元素相关
    console.log("body元素的宽：document.body.clientWidth ->"+document.body.clientWidth) ;
    console.log("body元素的高：document.body.clientHeight ->"+document.body.clientHeight) ;
    console.log("body元素的宽(包括边线的宽)：document.body.offsetWidth  ->"+document.body.offsetWidth) ;
    console.log("body元素的高(包括边线的宽)：document.body.offsetHeight  ->"+document.body.offsetHeight) ;
    //dom元素相对于其父定位元素顶部的距离：dom.offsetTop  (dom为dom对象的引用)(包括边线的宽)
    //dom元素相对于其父定位元素左边的距离：dom.offsetLeft (dom为dom对象的引用)(包括边线的宽)
    console.log("body元素内部子元素的宽：document.body.scrollWidth ->"+document.body.scrollWidth) ;
    console.log("body元素内部子元素的高：document.body.scrollHeight ->"+document.body.scrollHeight) ;
    console.log("html元素内部子元素被卷去的高(is_writeable)：document.documentElement.scrollTop ->"+document.documentElement.scrollTop ) ;
    console.log("html元素内部子元素被卷去的左(is_writeable)：document.documentElement.scrollLeft ->"+document.documentElement.scrollLeft ) ;
    //3、电脑屏幕相关
    console.log("浏览器（外部）与电脑屏幕左边的距离：window.screenLeft ->"+window.screenLeft) ;
    console.log("浏览器（外部）与电脑屏幕顶部的距离：window.screenTop ->"+window.screenTop ) ;
    console.log("浏览器（外部）与电脑屏幕左边的距离：window.screenX ->"+window.screenX) ;
    console.log("浏览器（外部）与电脑屏幕顶部的距离：window.screenY ->"+window.screenY ) ;
    console.log("电脑屏幕的高：window.screen.height ->"+window.screen.height ) ;
    console.log("电脑屏幕的宽：window.screen.width ->"+window.screen.width ) ;
    console.log("浏览器屏幕可用工作区最大高度（最大化后的可用高度）(最大化后似乎与window.innerHeight相差几个px，不太准)：window.screen.availHeight ->"+window.screen.availHeight ) ;
    console.log("浏览器屏幕可用工作区最大宽度（最大化后的可用宽度）：window.screen.availWidth ->"+window.screen.availWidth ) ;
}
Query() ;
```