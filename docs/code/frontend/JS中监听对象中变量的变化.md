---
title: JS中监听对象中变量的变化
---

### 一、利用 Proxy 实现监听 js 中变量的变化

代码如下：

```js
var observe1 = (object, onChange) => {
  const handler = {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    set(target, key, value, receiver) {
      onChange(value);
      return Reflect.set(target, key, value, receiver);
    }
  };
  return new Proxy(object, handler);
};

var obj = {
  foo: false,
  a: {
    x:{
      y: 4 
    },
    b:[
      {
        c: false
      }
    ]
  }
};

var watchedObj = observe1(obj,(val)=>{
  console.log(`哈哈哈，监听到值变化为${val}了`);
});

watchedObj.foo = true; //哈哈哈，监听到值变化为true了

watchedObj.a.x.y = 5; ////哈哈哈，监听到值变化为5了

watchedObj.a.b[0].c = true;//哈哈哈，监听到值变化为true了
```

以上的思路主要是参考自Github仓库 [on-change](https://github.com/sindresorhus/on-change),有兴趣可以点进去看看。

对 `Proxy` 还不太了解的同学可以先读读阮一峰的[这篇文章](http://es6.ruanyifeng.com/#docs/proxy),或者MDN的[这篇文章](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。

### 二、用 `Object.defineProperty` 实现监听 js 中变量的变化

代码如下：

```js
function observe2(data,onChange) {
  if (!data || typeof data !== 'object') {
    return;
  }
  // 取出所有属性遍历
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key],onChange);
  });

  function defineReactive(data, key, val, onChange) {
    observe2(val,onChange); // 监听子属性
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function() {
        return val;
      },
      set: function(newVal) {
        onChange(newVal);
        val = newVal;
      }
    });
  }
};

var obj = {
  foo: false,
  a: {
    x:{
      y: 4 
    },
    b:[
      {
        c: false
      }
    ]
  }
};

observe2(obj,(val)=>{
  console.log(`哈哈哈，监听到值变化为${val}了`);
})

obj.foo = true; //哈哈哈，监听到值变化为true了

obj.a.x.y = 5; ////哈哈哈，监听到值变化为5了

obj.a.b[0].c = true;//哈哈哈，监听到值变化为true了
```

这样写的话也能实现第一种用 `Proxy` 实现的功能，不过两者也有差异：

1、如果写一个新的元素，则第一种方法能监听到，但是第二种方法监听不到
2、还有一个问题就是修改数组的`length`，以及数组的`push`等变异方法是无法触发setter的，也就是这两种情况第二种方法也监听不到


试试如下验证代码：
```js
watchedObj.a.b.length = 4;
watchedObj.a.x.z = 'tt';
watchedObj.a.b.push("2");

obj.a.b.length = 4;
obj.a.x.z = 'tt';
obj.a.b.push("2");
```

