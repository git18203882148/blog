---
title: JS中的this
---


### 一、开始

最近阅读《你不知道的javascript》，里面有关于 `this` 的详细介绍，王二受益匪浅，于是在这里做一个分享。

关于JS中的 `this` 到底是什么，知乎中轮子哥这样说到：

> `this` 在js的函数里面只是一个参数，是通过 `Fuck.Shit(Bitches)` 这种语法来传递的，点号前面的表达式就算 `this`。

轮子哥说的没错，通常来说，想要确定 `this` 就是寻找“函数被调用的位置”，但是这做起来并没有这么简单，因为某些编程模式可能会隐藏真正的调用位置。

划分到具体，js中有四条绑定规则来确定 `this` 的绑定对象。

### 二、四条绑定规则

假设我们已经找到函数的被调用位置，我们还要确定用下面四条绑定规则中的哪一条，来确定 `this` 的绑定对象。在这里，王二首先会分别解释这四条规则，然后解释多条规则都可用时它们的优先级如何排列。

#### 第一条规则：默认绑定

1、默认绑定下 `this` 会指向全局对象

```js
function foo() {     
    console.log( this.a ); 
} 
var a = 2; 
foo(); // 2
```

2、但是如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定，`this` 会绑定到 `undefined`,因此以上的代码会报错：

```js
"use strict";
function foo() {     
    console.log( this.a ); 
} 
var a = 2; 
foo(); // TypeError: this is undefined
```

3、但是如果我们显式地用 `window` 调用 `foo` 函数，则以上代码不会报错：

```js
"use strict";
function foo() {     
    console.log( this.a ); 
} 
var a = 2; 
window.foo(); // 2
```

这是因为我们应用了第二条规则——隐式绑定

#### 第二条规则：隐式绑定

如果一个函数中有 `this` ，这个函数有被**上一级**的对象所调用，那么 `this` 指向的就是**上一级**的对象；`this` 是在运行时被确定，而不是在定义时被确定。

1、参考如下代码：

```js
function foo() {
    console.log( this.a ); 
} 
var obj = {
    a: 2,     
    foo: foo 
};
obj.foo(); // 2
```

2、`this` 指向的是被调用方法的**上一级**对象，而不是它的最外层对象，

参考如下代码：

```js
function foo() {
    console.log( this.a ); 
} 
var obj2 = {
    a: 22,     
    foo: foo 
}; 
var obj1 = {     
    a: 12,     
    obj2: obj2 
}; 
obj1.obj2.foo(); // 22
```

3、`this` 是在运行时被确定，而不是在定义时被确定，

参考如下代码：

```js
function foo() {
    console.log( this.a ); 
} 
var obj = {     
    a: 2,     
    foo: foo 
}; 
var bar = obj.foo; // 函数别名！ 
var a = "oops, global"; // a是全局对象的属性
bar(); // "oops, global"
```

4、在方法的参数中传入函数时也需要特别注意，传入函数的 `this` 也指向其方法被调用的上一级对象

参考如下代码：

```js
function foo() {
    console.log( this.a ); 
}
function doFoo(fn) {     // fn其实引用的是foo     
    fn(); // <-- 调用位置！ 
} 
var obj = {     
    a: 2,     
    foo: foo 
}; 
var a = "oops, global"; // a是全局对象的属性
doFoo( obj.foo ); // "oops, global"  
```

再例如：

```js
function foo() {
    console.log( this.a ); 
} 
var obj = {     
    a: 2,     
    foo: foo 
}; 
var a = "oops, global"; // a是全局对象的属性
setTimeout( obj.foo, 100 ); // "oops, global"
```
在上面的的代码片段中，有时候我们就想打印 `obj` 中的 `a` 属性，这时候我们应该怎么修改呢？

这就需要我们应用第三条规则——显式绑定

#### 第三条规则：显式绑定

以上的代码可以如下修改来访问到 `obj` 中的 `a` 属性：

```js
function foo() {
    console.log( this.a ); 
} 
var obj = {     
    a: 2,     
    foo: foo 
}; 
var a = "oops, global"; // a是全局对象的属性
setTimeout( obj.foo.bind(obj), 100 ); // 2
```

这个代码片段中用了 `bind（）` 方法来显式修改 `this` 的指向，与 `bind（）` 方法有类似功能的还有 `call（）` 方法和 `apply（）` 方法，他们都可以改变 `this`的指向；

但是它们之间也有重要的区别：`bind（）` 是返回对应函数，便于稍后调用；`call（）` 、`apply（）` 则是立即调用 。关于这三个方法更详细的介绍，感兴趣的同学可以参考王二之前写过的一篇文章——[JS中apply、call、bind的用法](http://www.wangyulue.com/2017/09/20/JS%E4%B8%ADapply%E3%80%81call%E3%80%81bind%E7%9A%84%E7%94%A8%E6%B3%95/)

#### 第四条规则：new绑定

参考如下代码：

```js
function foo(a) {
    this.a = a; 
} 
var bar = new foo(2);
console.log( bar.a ); // 2
```

使用 `new` 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行[[原型]]连接。
3. 这个新对象会绑定到函数调用的 `this` 上。
4. 如果函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象。

其中第二步操作，王二这里暂不讨论。

更具第一步和第三部操作，我们可以知道**使用 `new` 来调用 `foo(..)` 时，我们会构造一个新对象并把它绑定到 `foo(..)` 调用中的 `this` 上。**

关于第四步操作，我们需要额外注意，王二接下来提供一些示例代码以供参考（此代码来自['追梦子'的博客](https://www.cnblogs.com/pssp/p/5216085.html)）：

示例代码一:

```js
function fn()  
{  
    this.user = '追梦子';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined
```

示例代码二:

```js
function fn()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined
```

示例代码三:

```js
function fn()  
{  
    this.user = '追梦子';  
    return 1;
}
var a = new fn;  
console.log(a.user); //追梦子
```

示例代码四:

```js
function fn()  
{  
    this.user = '追梦子';  
    return undefined;
}
var a = new fn;  
console.log(a.user); //追梦子
```

也就是说：**如果返回值是一个对象，那么 `this` 指向的就是那个返回的对象，如果返回值不是一个对象那么 `this` 还是指向函数的实例。**

### 三、四条绑定规则的优先级

现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。可以按照下面的顺序来进行判断：

1、 函数是否在 `new` 中调用（`new`绑定）？如果是的话this绑定的是新创建的对象。

```js
var bar = new foo()
```

2、 函数是否通过 `call`、`apply`、`bind`（显式绑定）调用？如果是的话，`this` 绑定的是指定的对象。

```js
var bar = foo.call(obj)
```

3、函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，`this` 绑定的是那个上下文对象。

```js
var bar = obj.foo()
```

4、如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 `undefined` ，否则绑定到全局对象。

```js
var bar = foo()
```

### 四、箭头函数里的this

箭头函数不使用 `this` 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 `this` 。

参考如下代码：

```js
function foo() {      // 返回一个箭头函数     
    return () => {   //this继承自foo()       
        console.log( this.a );     
    }
} 
var obj1 = {
    a:2 
}; 
var obj2 = {
    a:3 
}; 
var bar = foo.call( obj1 ); 
bar.call( obj2 ); // 2, 不是3！
```

如果将箭头函数换为普通函数，则打印的是3:

```js
function foo() {   
    return function () {       
        console.log( this.a );     
    }
} 
var obj1 = {
    a:2 
}; 
var obj2 = {
    a:3 
}; 
var bar = foo.call( obj1 ); 
bar.call( obj2 ); // 3
```

也就是说，**箭头函数中的`this` 是函数在定义时被确定，而不是函数在运行时被确定的;** 而普通方法中的 `this` 是在运行时被确定，而不是在定义时被确定的。


### 五、参考阅读

[你不知道的Javascript(上)（中文版）](https://pan.baidu.com/s/1fXBzt-NUdVXQe_gHSGk4cA)  密码:x7ge

[阮一峰 es6tutorial 下的issue](https://github.com/ruanyf/es6tutorial/issues/150)

["追梦子"的博客](https://www.cnblogs.com/pssp/p/5216085.html)

[知乎关于this的问题](https://www.zhihu.com/question/25842198)