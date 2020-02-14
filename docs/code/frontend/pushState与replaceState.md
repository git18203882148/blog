---
title: pushState与replaceState
---

### 一、简介

HTML5引入了 [history.pushState()](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method) 和 [history.replaceState()](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method) 方法，它们分别可以添加和修改历史记录条目。这些方法通常与[window.onpopstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate) 配合使用。

### 二、pushState() 方法的例子

假设在 `http://mozilla.org/foo.html` 中执行了以下 JavaScript 代码:

```js
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html");
```

这将使浏览器地址栏显示为 `http://mozilla.org/bar.html`，但并不会导致浏览器加载 `bar.html` ，甚至不会检查`bar.html` 是否存在。

假设现在用户又访问了 `http://google.com`，然后点击了返回按钮。此时，地址栏将显示 `http://mozilla.org/bar.html`，同时页面会触发 `popstate` 事件，事件对象state中包含了 `stateObj` 的一份拷贝。页面本身与 `foo.html` 一样，尽管其在 `popstate`  事件中可能会修改自身的内容。

如果我们再次点击返回按钮，页面URL会变为`http://mozilla.org/foo.html`，文档对象document会触发另外一个 `popstate` 事件，这一次的事件对象state object为null。 这里也一样，返回并不改变文档的内容，尽管文档在接收 `popstate` 事件时可能会改变自己的内容，其内容仍与之前的展现一致。

### 三、pushState() 方法

`pushState()` 需要三个参数: 一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个URL. 让我们来解释下这三个参数详细内容：

> **状态对象** — 状态对象state是一个JavaScript对象，通过pushState () 创建新的历史记录条目。无论什么时候用户导航到新的状态，popstate事件就会被触发，且该事件的state属性包含该历史记录条目状态对象的副本。

> **标题** — 目前忽略这个参数被忽略，但未来可能会用到。传递一个空字符串在这里是安全的，而在将来这是不安全的。二选一的话，你可以为跳转的state传递一个短标题。

> **URL** — 该参数定义了新的历史URL记录。注意，调用 `pushState()` 后浏览器并不会立即加载这个URL，但可能会在稍后某些情况下加载这个URL，比如在用户重新打开浏览器时。新URL不必须为绝对路径。如果新URL是相对路径，那么它将被作为相对于当前URL处理。新URL必须与当前URL同源，否则 `pushState()` 会抛出一个异常。该参数是可选的，缺省为当前URL。

### 四、pushState() 方法与设置hash值的区别

在某种意义上，调用 `pushState()` 与 设置 `window.location = "#foo"` 类似，二者都会在当前页面创建并激活新的历史记录。但 `pushState()` 具有如下几条优点：

> 新的 URL 可以是与当前URL同源的任意URL 。而设置 window.location 仅当你只修改了哈希值时才保持同一个文件。

> 如果需要，可以不必改变URL就能创建一条历史记录。而设置 `window.location = "#foo"`;,只有在当前哈希不是 `#foo` 的情况下， 才会创建一个新的历史记录项。

> 我们可以为新的历史记录项关联任意数据。而基于哈希值的方式，则必须将所有相关数据编码到一个短字符串里。

### 五、replaceState() 方法

`history.replaceState()` 的使用与 `history.pushState()` 非常相似，区别在于 `replaceState()` 是修改了当前的历史记录项而不是新建一个。

### 六、popstate 事件

每当处于激活状态的历史记录条目发生变化时,`popstate` 事件就会在对应window对象上触发。 如果当前处于激活状态的历史记录条目是由`history.pushState()`方法创建,或者由`history.replaceState()`方法修改过的, 则`popstate`事件对象的`state`属性包含了这个历史记录条目的state对象的一个拷贝。

我们也可以直接在history对象上获取`state`，如下：
```js
var currentState = history.state;
```

需要注意的是，调用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件。 `opstate`事件只会在浏览器某些行为下触发， 比如点击后退、前进按钮(或者在JavaScript中调用`history.back()`、`history.forward()`、`history.go()`方法)。

### 七、popstate 事件的例子

假如当前网页地址为 `http://example.com/example.html` ,则运行下述代码后:

```js
window.onpopstate = function(event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
//绑定事件处理函数. 
history.pushState({page: 1}, "title 1", "?page=1");    //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({page: 2}, "title 2", "?page=2");    //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.replaceState({page: 3}, "title 3", "?page=3"); //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.back(); // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // 弹出 "location: http://example.com/example.html, state: null
history.go(2);  // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
```

### 八、pushState()的用途

王二使用 `pushState()` 主要是它可以监听到浏览器上的返回事件，这在移动端上也同样适用，参考如下一段代码(**可以直接运行**）：

```html
<body>
    <div>window.onpopstate可以监听到返回键事件</div>
    <script>
        history.pushState({}, ""); 
        window.onpopstate = function(event) {
            //这里可以监听到浏览器的返回事件，并做你想做的事情，
            //例如：跳转到另一个网页
            location.href = "https://www.baidu.com";
        };
    </script>
</body>
```

当然，用 `window.onhashchange` 也可以监听到浏览器上的返回事件，参考如下一段代码(**可以直接运行**）：

```html
<body>
    <div>window.onhashchange可以监听到返回键事件</div>
    <script>
        setTimeout(()=>{
            location.hash="a"
        },100);
        setTimeout(()=>{
            window.onhashchange = function(event) {
                location.href = "https://www.baidu.com";
            }
        },200);
    </script>
</body>
```

### 九、参考文章
['pushState'、'replaceState'MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/History_API)([中文翻译版](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API))
['onpopstate'MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)([中文翻译版](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onpopstate))