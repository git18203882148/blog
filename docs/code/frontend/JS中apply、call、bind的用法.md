---
title: JS中apply、call、bind的用法
---


apply()和call()都是为了改变某个函数运行时的上下文而存在的（就是为了改变函数内部this的指向）,bind()会创建一个新的函数, 当被调用时，将其this关键字设置为提供的值

### 一、了解apply()的作用

1、先来一个实例
```javascript
var wanger = {
    name: '王二',
    birth: 1995,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
wanger.age(); // 17年调用是22,18年调用就变成23了
```
上面的对象定义了一个wanger对象，里面有个age方法，当调用age方法时，就可以得到王二的年龄；
这时候，下面又来了一个张三:
```javascript
var zhangsan = {
    name: '张三',
    birth: 1992,
};
```
他没有age方法，但他也想知道自己的年龄，那该怎么办呢？
或许我们可以借用王二的age方法来帮助张三知道自己的年龄，这时候，apply()就能帮到我们：
```javascript
wanger.age.apply(zhangsan); //17年调用是25,18年调用就变成26了
```
上面apply()中的zhangsan成功地调用到了wanger的age方法。

在MDN中，是这么解释apply方法的：
> 在调用一个存在的函数时，你可以为其指定一个 `this` 对象。 `this` 指当前对象，也就是正在调用这个函数的对象。 使用 `apply`， 你可以只写一次这个方法然后在另一个对象中继承它，而不用在新对象中重复写该方法。

### 二、apply()与call()的区别

>call()方法的作用和apply()方法类似，只有一个区别，就是call()方法接受的是若干个**参数的列表**，而apply()方法接受的是一个包含多个**参数的数组**

王二和张三要获得期末考试语文和数学加起来的成绩，如下代码所示：
```javascript
var wanger = {
    name: '王二',
    score: function (x,y) {
        return x+y ;
    }
};
var zhangsan = {
    name: '张三',
};
wanger.score.apply(zhangsan,[100,98]);  //198
wanger.score.call(zhangsan,100,98);  //198
```
以上两种方法都能获得张三的成绩；


两个方法用途差不多，为什么还要分成两个方法呢？还有那个谁，对，apply,还要放个数组进去，累不累啊？

但是设计者这样设计是有用途的，参考如下代码：

```javascript
var wanger = {
    name: '王二',
    score: function () {
        return [...arguments].reduce((x,y)=>x+y) ; //获得传入成绩的总和
    }
};
var zhangsan = {
    name: '张三',
};
wanger.score.apply(zhangsan,[100,98,95]);  //293
wanger.score.call(zhangsan,100,98,95);  //293

wanger.score.apply(zhangsan,[100,98,95,96]);  //389
wanger.score.call(zhangsan,100,98,95,96);  //389
```
>当传入的的参数的值不固定时，call()的灵活性就明显不如apply()了，apply()只要传一个数组就搞定了。

### 三、bind()是干什么用的

在MDN中，是这么解释bind方法的：
>bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值

可以参考如下代码：
```javascript
var wanger = {
    name: '王二',
    birth: 1995,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
var zhangsan = {
    name: '张三',
    birth: 1992,
};
var getAge = wanger.age.bind(zhangsan); 
getAge() ;
```

这里bind()与call(),apply()有一个重要的区别：**bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。**

### 四、总结

> * apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
> * apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
> * apply 、 call 、bind 三者都可以利用后续参数传参；
> * bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

参考文献：
[MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
[廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345005399057070809cfaa347dfb7207900cfd116fb000)
["chokcoco"的博客](http://web.jobbole.com/83642/)
