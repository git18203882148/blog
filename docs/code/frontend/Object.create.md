---
title: Object.create
---

1、`Object.create()` 方法会使用指定的原型对象及其属性去创建一个新的对象，语法如下：

> Object.create(proto, [ propertiesObject ])

其中：

>* `proto`一个对象，新创建对象的原型
>* `propertiesObject`可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与`Object.defineProperties()`的第二个参数一样）。
>* 函数将返回一个定原型对象上添加新属性后的新对象
>* 如果 `propertiesObject` 参数不是 `null` 也不是对象，则抛出一个 `TypeError` 异常。

2、一些例子：

```javascript
var a = {v:41}
var b = Object.create(a)
b.__proto__ === a //true 
//Object.create返回的对象的原型是其第一个参数。
```

```javascript
o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);
```

```javascript
o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { 
    writable:true,
    configurable:true,
    value: "hello" 
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});
```

```javascript
// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p //42

o.q = 12
for (var prop in o) {  //for..in..不可枚举
   console.log(prop)
}
//"q"

delete o.p // Nothing happens
```

```javascript
//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, {
  p: {
    value: 42, 
    writable: true,
    enumerable: true,
    configurable: true 
  } 
});
```

3、使用 `Object.create` 实现类式继承,参考如下代码：

```javascript
//Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info("Shape moved.");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); //call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true

rect.move(1, 1); //Outputs, "Shape moved."
```

参考文档
[MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)