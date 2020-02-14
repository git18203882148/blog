---
title: JS中Object.defineProperty的使用方法
---

1、`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象，语法如下：

> Object.defineProperty(obj, prop, descriptor)

其中：

>* `obj`是需要被操作的目标对象
>* `prop`是目标对象需要定义或修改的属性的名称
>* `descriptor`是将被定义或修改的属性的描述符
>* 函数将返回被传递给函数的对象

2、一个简单的实例：

```javascript
var o = {};
Object.defineProperty(o, "a", {value : 37});  //{a: 37}
```

上述代码中，我们用`Object.defineProperty`为对象o创建的了一个新属性a,它的值为37，但是我们也发现了一些问题，参考如下代码：

```javascript
var o = {};
Object.defineProperty(o, "a", {value : 37});  //{a: 37}
console.log(o.a); // 打印 37
o.a = 25; // 没有错误抛出（在严格模式下会抛出，即使之前已经有相同的值）
console.log(o.a); // 打印 37， 赋值不起作用。
```

我们发现，对o.a赋值似乎不起作用，原来`Object.defineProperty`的第三个参数`descriptor`有很多属性描述符，其中就有**是否能被赋值运算符改变value**的属性描述符。

3、具体的属性描述符如下：

>* `configurable` 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。**默认为 false**。
>* `enumerable` 当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中**(可以被for..in..遍历)**。**默认为 false**。
>* `value` 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。**默认为 undefined**。
>* `writable` 当且仅当该属性的 writable 为 true 时，该属性才能被赋值运算符改变。**默认为 false**。
>* `get` 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。**默认为 undefined**。
>* `set` 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。**默认为 undefined**。

4、这时候我们改造一下代码，如下：

```javascript
var o = {};
Object.defineProperty(o, "a", {
    value : 37,
    writable : true,
    enumerable : true,
    configurable : true
});  //{a: 37}
console.log(o.a); // 打印 37
o.a = 25;
console.log(o.a); // 打印 25
```
这样的话我们就可以正确地为属性赋值了。

5、需要注意的是，对象里目前存在的属性描述符有两种主要形式：**数据描述符**和**存取描述符**。数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。**描述符必须是两种形式之一；不能同时是两者。**参考如下：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1808/1.png?raw=true)

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1808/2.png?raw=true)


如果两者同时使用，会报如下错误：

```javascript
var o = {};
Object.defineProperty(o, "conflict", {
  value: 0x9f91102, 
  get: function() { 
    return 0xdeadbeef; 
  } 
});
//Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
```

6、在这里，我们需要特别注意 `configurable` 这个属性描述符，如果它的值为`false`，那么除了 `writable` 外，其他特性都不能被修改(包括其自身)，并且 `writable` 只能从 `true` 修改为 `false`，而且数据和存取描述符也不能相互切换。

如果尝试修改，会报如下错误：

```javascript
var o = {};
Object.defineProperty(o, "a", { 
    get : function(){return 1;}, 
    configurable : false 
});
// throws a TypeError
Object.defineProperty(o, "a", {configurable : true}); 
// throws a TypeError
Object.defineProperty(o, "a", {enumerable : true}); 
// throws a TypeError (set was undefined previously) 
Object.defineProperty(o, "a", {set : function(){}}); 
// throws a TypeError (even though the new get does exactly the same thing) 
Object.defineProperty(o, "a", {get : function(){return 1;}});
// throws a TypeError
Object.defineProperty(o, "a", {value : 12});

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1
```

7、最后，我们又要留意一下存取描述符`set`与`get`，vuejs的底层就是通过`set`与`get`监听数据变动来实现mvvm的双向绑定的，参考如下代码：

```javascript
function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};

function defineReactive(data, key, val) {
    observe(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
        }
    });
}

var obj = {a:'10',b:'20'}
observe(obj)
obj.a // '10'
obj.a = '100' 
// 哈哈哈，监听到值变化了  10  -->  100
// '100'
```

参考文档
[MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

[Snandy 的博客](https://www.cnblogs.com/snandy/p/5276578.html)