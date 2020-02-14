---
title: ES6中类的使用简明教程
---

### 一、开始

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子

```js
function Animal(x, y) {
  this.x = x;
  this.y = y;
}

Animal.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Animal(1, 2);
```
上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的class改写，就是下面这样:

```js
//定义类
class Animal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

### 二、属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例的时候，会自动调用构造函数。

```typescript
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

**需要注意的是。类的内部所有定义的方法，都是不可枚举的（non-enumerable），这一点与 ES5 的行为不一致。**

### 三、constructor方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

```js
class Animal {
}

// 等同于
class Animal {
  constructor() {}
}
```

### 四、实例的属性

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

```js
//定义类
class Animal {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var animal = new Animal(2, 3);

animal.toString() // (2, 3)

animal.hasOwnProperty('x') // true
animal.hasOwnProperty('y') // true
animal.hasOwnProperty('toString') // false
animal.__proto__.hasOwnProperty('toString') // true
```

### 五、不存在变量提升

类不存在变量提升（hoist），这一点与 ES5 完全不同。

```js
new Animal(); // ReferenceError
class Animal {}
```


### 六、类的继承

使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

```typescript
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

### 七、存取器

使用 `getter` 和 `setter` 可以改变属性的赋值和读取行为：

```typescript
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

### 八、静态方法

使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```ts
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

---
`ES7` 中有一些关于类的提案，`TypeScript` 也实现了它们，这里做一个简单的介绍。

### 九、实例属性

ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义：

```ts
class Animal {
  name = 'Jack';

  constructor() {
    // ...
  }
}

let a = new Animal();
```

### 十、静态属性

ES7 提案中，可以使用 static 定义一个静态属性：

```ts
class Animal {
  static num = 42;

  constructor() {
    // ...
  }
}

console.log(Animal.num); // 42
```

参考文章
['阮一峰'的ES6入门教程](http://es6.ruanyifeng.com/#docs/class)
['xcatliu'的TypeScript辅导教程](https://github.com/xcatliu/typescript-tutorial)