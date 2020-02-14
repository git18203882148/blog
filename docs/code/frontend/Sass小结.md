---
title: Sass小结
---

### 一、SCSS 与 Sass 异同

`SCSS` 是 `Sass3` 引入新的语法，其语法完全兼容 `CSS3`，并且继承了 `Sass` 的强大功能。也就是说，任何标准的 `CSS3` 样式表都是具有相同语义的有效的 `SCSS` 文件。另外，`SCSS` 还能识别大部分 `CSS hacks`（一些 `CSS` 小技巧）和特定于浏览器的语法。

由于 `SCSS` 是 `CSS` 的扩展，因此，所有在 `CSS` 中正常工作的代码也能在 `SCSS` 中正常工作。也就是说，对于一个 `Sass` 用户，只需要理解 `Sass` 扩展部分如何工作的，就能完全理解 `SCSS`。大部分扩展，例如变量、`parent references` 和 指令都是一致的；唯一不同的是，`SCSS` 需要使用分号和花括号而不是换行和缩进。 例如，以下这段简单的 `Sass` 代码：

```sass
#sidebar
  width: 30%
  background-color: #faa
```

只需添加花括号和分号就能转换为 SCSS 语法：

```scss
#sidebar {
  width: 30%;
  background-color: #faa;
}
```

另外，SCSS 对空白符号不敏感。上面的代码也可以书写成下面的样子：

```scss
#sidebar {width: 30%; background-color: #faa}
```

### 二、 变量名用中划线还是下划线？

`sass` 并不想强迫任何人一定使用中划线或下划线，所以这两种用法相互兼容。用中划线声明的变量可以使用下划线的方式引用，反之亦然。这意味着即使 `compass` 选择用中划线的命名方式，这并不影响你在使用 `compass` 的样式中用下划线的命名方式进行引用：

```scss
$link-color: blue;
a {
  color: $link_color;
}

//编译后

a {
  color: blue;
}
```

### 三、子组合选择器和同层组合选择器：>、+和~

这些组合选择器可以毫不费力地应用到sass的规则嵌套中。可以把它们放在外层选择器后边，或里层选择器前边：

```scss
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```

### 四、静默注释

`sass`另外提供了一种不同于`css`标准注释格式`/* ... */`的注释语法，即静默注释，其内容不会出现在生成的`css`文件中。静默注释的语法跟`Java`、`ScriptJava`等类 `C` 的语言中单行注释的语法相同，它们以 `//` 开头，注释内容直到行末:

```scss
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

### 五、混合器

如果你的整个网站中有几处小小的样式类似（例如一致的颜色和字体），那么使用变量来统一处理这种情况是非常不错的选择。但是当你的样式变得越来越复杂，你需要大段大段的重用样式的代码，独立的变量就没办法应付这种情况了。你可以通过`sass`的混合器实现大段样式的重用。

混合器使用 `@mixin` 标识符定义,这个标识符给一大段样式赋予一个名字，这样你就可以轻易地通过引用这个名字重用这段样式。下边的这段 `sass` 代码，定义了一个非常简单的混合器，目的是添加跨浏览器的圆角边框。

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

然后就可以在你的样式表中通过 `@include` 来使用这个混合器，放在你希望的任何地方。`@include` 调用会把混合器中的所有样式提取出来放在 `@include` 被调用的地方。如果像下边这样写：

```scss
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}

//sass最终生成:

.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

**当然，混合器也可以使用`sass`的各种规则，变量、嵌套，随便你用。**

更令人兴奋地是， 我们还可以给混合器传参，来定制混合器生成的精确样式。用起来很向`js`的函数：

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

当混合器被 `@include` 时，你可以把它当作一个`css`函数来传参。如果你像下边这样写：

```scss
a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

噢，对了，我们还可以为混合器设置默认参数，是不是觉得用上了JS的`ES6`语法。

参数默认值使用`$name: default-value`的声明形式，默认值可以是任何有效的`css`属性值，甚至是其他参数的引用，如下代码：

```scss
@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

如果像下边这样调用：`@include link-colors(red)`, `$hover`和`$visited`也会被自动赋值为`red`。

参考文档
[sass 中文网](https://www.sass.hk/guide/)