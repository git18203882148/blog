---
title: Typescript小结
---

> **需要注意的是，这篇文章是王二本人在刷了一遍`TypeScript`的语法后，认为有些地方需要着重注意，于是在这里做的一个小总结。**
**如果需要系统的过一遍`TypeScript`的语法，这里重点推荐微软大神[xcatliu](https://github.com/xcatliu)的[TypeScript辅导教程](https://github.com/xcatliu/typescript-tutorial)，王二就是看的这篇教程写的这篇文章，也可以看[TypeScript文档](http://www.typescriptlang.org/docs/handbook/basic-types.html)([中文](http://www.tslang.cn/docs/handbook/basic-types.html))系统了解**

### 一、什么是 TypeScript

TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

### 二、TypeScript 的特点

王二认为 TypeScript 最大的特点是 **可以进行静态检查语法，可以在编译阶段就发现大部分错误**，这一点和java很像。

而且 TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可。

### 三、安装 TypeScript

TypeScript 的命令行工具安装方法如下：

> npm install -g typescript

以上命令会在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行 tsc 命令了。

我们约定使用 TypeScript 编写的文件以 .ts 为后缀，

编译一个 TypeScript 文件很简单：

>tsc hello.ts

然后就会在 hello.ts 同一级的目录下生成一个 hello.js文件。

### 四、推荐编辑器

当然是推荐[Visual Studio Code](https://code.visualstudio.com/)啦，它本身就是由 `TypeScript` 编写的，而且天然支持对 `TypeScript` 支持。

### 五、一个简单的例子

将以下代码复制到 hello.ts 中：

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

然后执行

tsc hello.ts

这时候会生成一个编译好的文件 hello.js：

```typescript
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

TypeScript 中，使用 : 指定变量的类型，: 的前后有没有空格都可以。

上述例子中，我们用 : 指定 person 参数类型为 string。但是编译为 js 之后，并没有什么检查的代码被插入进来。

**如果发现有错误，编译的时候就会报错。**

下面尝试把这段代码编译一下：

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = [0, 1, 2];
console.log(sayHello(user));
```

编辑器中会提示错误，编译的时候也会出错：

> index.ts(6,22): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.

但是还是生成了 js 文件：

```typescript
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = [0, 1, 2];
console.log(sayHello(user));
```

TypeScript 编译的时候即使报错了，还是会生成编译结果，我们仍然可以使用这个编译之后的文件。


### 六、空值

JavaScript 没有空值（Void）的概念，在 TypeScirpt 中，可以用 void 表示没有任何返回值的函数：

```typescript
function alertName(): void {
  alert('My name is Tom');
}
```

声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：

```typescript
let unusable: void = undefined;
```

### 七、Null 和 Undefined

在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

```typescript
let u: undefined = undefined;
let n: null = null;
```

undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null。

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

```typescript
// 这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num: number = u;
```

而 void 类型的变量不能赋值给 number 类型的变量：

```typescript
let u: void;
let num: number = u;

// index.ts(2,5): error TS2322: Type 'void' is not assignable to type 'number'.
```

### 八、任意值

任意值（Any）用来表示允许赋值为任意类型，参考如下代码：

```typescript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

但如果是 any 类型，则允许被赋值为任意类型。

```typescript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**

### 九、类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

以下代码虽然没有指定类型，但是会在编译的时候报错：

```typescript
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

事实上，它等价于：

```typescript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

##如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：##

```typescript
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 十、联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

例如上面的代码：

```typescript
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

用联合类型写就不会报错：

```typescript
let myFavoriteNumber :(string|number) = 'seven';
myFavoriteNumber = 7;
```

### 十一、接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述，参考如下代码：

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

上面的例子中，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致。

**但是这个时候变量少了或者多了都会报错，我们可以用可选属性、任意属性、只读属性来进一步制定接口，详细可以了解[这篇文章](https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-of-object-interfaces.md)**

### 十二、定义数组类型

在 TypeScript 中，数组类型有多种定义方式，比较灵活。

以下三种方式都可以定义数组：
```typescript
//最简单的方法是使用「类型 + 方括号」来表示数组：
let fibonacci1: number[] = [1, 1, 2, 3, 5];
//也可以使用数组泛型（Array Generic） Array<elemType> 来表示数组：
let fibonacci2: Array<number> = [1, 1, 2, 3, 5];
//接口也可以用来描述数组：
interface NumberArray {
    [index: number]: number;
}
let fibonacci3: NumberArray = [1, 1, 2, 3, 5];
```

以上的代码中，数组中类型要求一致，如果想允许出现任意类型，可以用 any ： 

```typescript
let list: any[] = ['Wanger', 22, { website: 'http://www.wangyulue.com' }];
```

Typescript 还实现了常见的类数组的接口定义，如 IArguments, NodeList, HTMLCollection 等，例如接受函数内的 arguments 对象：

```typescript
function sum() {
    let args: IArguments = arguments;
}
```

### 十三、约束函数的类型

在 Typescript 中也可以约束函数的输入和输出，参考如下代码：

```typescript
function sum(x: number, y: number): number {
    return x + y;
}
```

这时候 sum 函数被约束为只接受两个 number 类型并输出为一个 number 类型的函数。

现在哪怕输入多余的（或者少于要求的）参数，都是不被允许的：

```typescript
function sum(x: number, y: number): number {
    return x + y;
}
sum(1, 2, 3);

// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
function sum(x: number, y: number): number {
    return x + y;
}
sum(1);

// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
```

我们也可以使用接口的方式来定义一个函数需要符合的形状：

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

**这时候其实还有 可选参数、参数默认值、剩余参数、重载的概念，有兴趣可以了解[这篇文章](https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-of-function.md)**

### 十四、申明文件

假如我们想使用第三方库，比如 jQuery，我们通常这样获取一个 id 是 foo 的元素：

```typescript
$('#foo');
// or
jQuery('#foo'); 
```

但是在 TypeScript 中，我们并不知道 $ 或 jQuery 是什么东西：

```typescript
jQuery('#foo');

// index.ts(1,1): error TS2304: Cannot find name 'jQuery'.
```

这时，我们需要使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型：

```typescript
declare var jQuery: (string) => any;

jQuery('#foo');
```

declare 定义的类型只会用于编译时的检查，编译结果中会被删除。

上例的编译结果是：

```typescript
jQuery('#foo');
```

通常我们会把类型声明抽出来放到一个单独的文件中，这就是声明文件：

```typescript
// jQuery.d.ts

declare var jQuery: (string) => any;
```

> 我们约定声明文件以 .d.ts 为后缀。

然后在使用到的文件的开头，用「三斜线指令」表示引用了声明文件：

```typescript
/// <reference path="./jQuery.d.ts" />

jQuery('#foo');
```

当然，jQuery 的声明文件不需要我们定义了，已经有人帮我们定义好了：[jQuery in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jquery/index.d.ts)。

我们可以直接下载下来使用，但是更推荐的是使用工具统一管理第三方库的声明文件。

社区已经有多种方式引入声明文件，不过 [TypeScript 2.0 推荐使用 @types 来管理](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)。

@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：

> npm install @types/jquery --save-dev

可以在[这个页面](http://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。

### 十五、内置对象

`ECMAScript`标准提供的内置对象有：

`Boolean`、`Error`、`Date`、`RegExp` 等。

我们可以在 TypeScript 中将变量定义为这些类型：

```typescript
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

更多的内置对象，可以查看 [MDN 的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)。

而他们的定义文件，则在 [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中。

### 十六、类型别名

一个简单的例子：

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  }
  else {
    return n();
  }
}
```

上例中，我们使用 `type` 创建类型别名。

类型别名常用于联合类型。

### 十七、字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个，举一个简单的例子：

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

// index.ts(7,47): error TS2345: Argument of type '"dbclick"' is not assignable to parameter of type 'EventNames'.
```

上例中，我们使用 `type` 定了一个字符串字面量类型 `EventNames`，它只能取三种字符串中的一种。

注意，**类型别名与字符串字面量类型都是使用 type 进行定义**。

### 十八、类

我们先来回顾一下ES6中类的用法，这里当然推荐阮一峰大神的[ES6-class教程](http://es6.ruanyifeng.com/#docs/class)，或者王二总结的[ES6中类的使用简明教程](http://www.wangyulue.com/2017/11/07/ES6%E4%B8%AD%E7%B1%BB%E7%9A%84%E4%BD%BF%E7%94%A8%E7%AE%80%E6%98%8E%E6%95%99%E7%A8%8B/#more)

`TypeScript` 有三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`:

>* `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
>* `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
>* `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

> 这里和Java的访问修饰符很像，Java还多一个`default`

例如，有时候我们希望有的属性是无法直接存取的，这时候就可以用 private 了：

```ts
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(9,13): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
// index.ts(10,1): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
```

需要注意的是，`TypeScript` 编译之后的代码中，并没有限制 `private` 属性在外部的可访问性。

而且使用 `private` 修饰的属性或方法，在子类中也是不允许访问的;而如果是用 `protected` 修饰，则允许在子类中访问。

给类加上 TypeScript 的类型很简单，与接口类似：

```ts
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

### 十九、类与接口

接口（Interfaces）可以不但可以用于对「对象的形状（Shape）」进行描述，而且可以对类的一部分行为进行抽象。

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：

```ts
interface Alarm {
  alert();
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor alert');
  }
}

class Car implements Alarm {
  alert() {
    console.log('Car alert');
  }
}
```

一个类可以实现多个接口：

```ts
interface Alarm {
  alert();
}

interface Light {
  lightOn();
  lightOff();
}

class Car implements Alarm, Light {
  alert() {
    console.log('Car alert');
  }
  lightOn() {
    console.log('Car light on');
  }
  lightOff() {
    console.log('Car light off');
  }
}
```

上例中，Car 实现了 Alarm 和 Light 接口，既能报警，也能开关车灯。

### 二十、混合类型

之前学习过，可以使用接口的方式来定义一个函数需要符合的形状：

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```

有时候，一个函数还可以有自己的属性和方法,这时候可以使用混合类型：

```ts
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### 二十一、泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

例如，我们来实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```ts
function createArray(length: number, value: any): Array<any> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

以上代码有一个显而易见的缺陷是：它并没有准确的定义返回值的类型。

`Array<any>` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 `value` 的类型。

这时候，泛型就派上用场了：

```ts
function createArray<T>(length: number, value: T): Array<T> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

**还有 多个类型参数、泛型约束、泛型接口、泛型类的概念，有兴趣可以了解[这篇文章](https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/generics.md)**
