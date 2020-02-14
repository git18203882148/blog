---
title: CSS踩坑小结
---

### 一、iOS上的Safari没有滑动惯性

在开发iphone微信端的时候，如果给一个`div`设置样式为滑动,样式如下：
```css
div{
  overflow-y:scroll ;
}
```
会发现Safari的滑动很僵硬，这时候可以用以下样式来解决：
```css
div{
  -webkit-overflow-scrolling: touch;
}
```

### 二、去除iphone中点击按钮会出现一个半透明的灰色背景的问题

在开发iphone微信端的时候，同样发现，如果点击一个按钮，按钮会出现一个半透明的灰色背景，这时候可以用以下样式来解决：

```css
a,img,button,input,textarea,div{                       
  -webkit-tap-highlight-color:rgba(255,255,255,0); 
}
```

### 三、div中保留文本的空格、换行以及tab字符的处理

在后台用`textarea`标签写入文本放入前端显示的时候，发现之前在`textarea`中的文本都被格式化了（浏览器默认把文本中的空格、换行以及tab字符都处理掉了），如果想保留文本的格式，可以用以下样式来解决：

```css
div{
  white-space: pre-wrap;
}
```

需要特别注意的是，`white-space`有五种值可以选择，`normal`、`pre` 、`nowrap` 、`pre-wrap`、`pre-wrap`,每一种值都有不同的表现形式，其中：

>* `normal` 是 `white-space` 的默认值；
>* `pre` 会保留文本中额外的空格, 而且会保留文本中的换行；
>* `nowrap` 不会保留文本中额外的空格，而且会禁止文本中的换行；
>* `pre-wrap` 会保留文本中额外的空格, 而且会让文本正常的换行；
>* `pre-line` 不会保留文本中额外的空格，但是会让文本正常的换行；

这样解释读者会有一些迷惑，接下来用代码进一步说明，参考如下代码：

```html
<style>
    .a{
        white-space: pre
    }
    .b{
        white-space: nowrap
    }
    .c{
        white-space: pre-wrap
    }
    .d{
        white-space: pre-line
    }
    .e{
        white-space: normal
    }
</style>

<div class="a">
    hdfkf    sjnfjsdkfn    sdjf  d d dfklsf  sdfhjs sdfbsjdh df
    djfsf dsfsdf

    sdfbsjdh

    hfh         hfjsgjf
</div>

<hr>

<div class="b">
    hdfkf    sjnfjsdkfn    sdjf  d d dfklsf  sdfhjs sdfbsjdh df
    djfsf dsfsdf

    sdfbsjdh

    hfh         hfjsgjf
</div>

<hr>

<div class="c">
    hdfkf    sjnfjsdkfn    sdjf  d d dfklsf  sdfhjs sdfbsjdh df
    djfsf dsfsdf

    sdfbsjdh

    hfh         hfjsgjf
</div>

<hr>

<div class="d">
    hdfkf    sjnfjsdkfn    sdjf  d d dfklsf  sdfhjs sdfbsjdh df
    djfsf dsfsdf

    sdfbsjdh

    hfh         hfjsgjf
</div>

<hr>

<div class="e">
    hdfkf    sjnfjsdkfn    sdjf  d d dfklsf  sdfhjs sdfbsjdh df
    djfsf dsfsdf

    sdfbsjdh

    hfh         hfjsgjf
</div>

<hr>

<div>
    hdfkf    sjnfjsdkfn    sdjf  d d dfklsf  sdfhjs sdfbsjdh df
    djfsf dsfsdf

    sdfbsjdh

    hfh         hfjsgjf
</div>
    
```

这里我们要特地留意一下 `pre` 与 `pre-wrap` 的区别，正常情况下，两者的现实没有差异，如下图：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1710/1.jpeg?raw=true)

但是如果将窗口拉窄,我们会发现，`pre-wrap`会让文本根据窗口宽窄自动换行，而`pre`的换行不会受窗口宽窄影响：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1710/2.jpeg?raw=true)

### 四、让盒子里的字超出长度后，可以缩略显示变成点点点

1、在 `div` 框里的内容超出长度后，我们可以让超出部分的内容变成点点点，样式如下：

```css
div{
    overflow:hidden;
    white-space:nowrap; 
    text-overflow:ellipsis;
}
```

然后我们就能获得我们想要的样式：

```html
<style>
    .a{
        width:100px; 
        border: 1px solid gray;
    }
    .ellipsis{
        overflow:hidden;
        white-space:nowrap; 
        text-overflow:ellipsis;
    }
</style>

<div class="a">Wow,CSS is very very very very very cool !</div>

<hr>

<div class="a ellipsis">Wow,CSS is very very very very very cool !</div>
```

效果图如下：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1710/3.jpeg?raw=true)

2、但是**如果我们想让div里的内容两行或者三行之后再显示点点点**，我们应该怎么办呢？如果你也有疑惑，可以参考如下代码：

```html
<style>
    .a{
        width:100px; 
        border: 1px solid gray;
    }
    .ellipsis{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>

<div class="a">Wow,CSS is very very very very very cool !</div>

<hr>

<div class="a ellipsis">Wow,CSS is very very very very very cool !</div>
```

效果图如下：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1710/4.jpeg?raw=true)

> 这时候变成三行后再省略也相当简单，直接将 `-webkit-line-clamp` 变成 3 就行了。

3、特别特别需要注意的是，如果遇到丧心病狂的测试，他会给出一长串连续的英文字符，那么以上代码有可能会失效，这时候就需要`word-break: break-all;` 来帮助我们，参考如下代码：

```html
<style>
    .a{
        width:100px; 
        border: 1px solid gray;
    }
    .break{
        word-break: break-all ;
    }
    .ellipsis{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>

<div class="a">ssssssasjdjdfjsdfksdfgksdfgskdfgskjdfksdf</div>

<hr>

<div class="a ellipsis">ssssssasjdjdfjsdfksdfgksdfgskdfgskjdfksdf</div>

<hr>

<div class="a break ellipsis">ssssssasjdjdfjsdfksdfgksdfgskdfgskjdfksdf</div>

<hr>

<div class="a break">ssssssasjdjdfjsdfksdfgksdfgskdfgskjdfksdf</div>
```

效果图如下：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1710/5.jpeg?raw=true)

### 五、word-wrap和word-break的区别

1、word-wrap和word-break都能使过长的字符串断开，防止其溢出，那他们两的区别又是什么呢？

2、我们先从[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break)文档里了解它们的概要：

CSS 属性 `word-break` 指定了怎样在单词内断行。
他的属性有：
>* `normal`   使用默认的断行规则。
>* `break-all`   对于non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。
>* `keep-all`   CJK 文本不断行。 Non-CJK 文本表现同 normal。

CSS 属性 `word-wrap` 是用来说明当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行。
他的属性有：
>* `normal`   表示在正常的单词结束处换行。
>* `break-word`   表示如果行内没有多余的地方容纳该单词到结尾，则那些正常的不能被被分割的单词会被强制分割换行。

3、仅仅看解释并不能看出什么头绪，接下来用代码来演示他们的差异，代码如下：

```html
<style>
.a{
    width:100px; 
    border: 1px solid gray;
}
.break{
    word-break: break-all ;
}
.wrap{
    word-wrap: break-word ;
}
</style>

<div class="a">you are vvvvvvvvvvvvvvvvvvvvvvvery beautiful!</div>

<hr>

<div class="a break">you are vvvvvvvvvvvvvvvvvvvvvvvery beautiful!</div>

<hr>

<div class="a wrap">you are vvvvvvvvvvvvvvvvvvvvvvvery beautiful!</div>

```

效果图如下：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1710/6.jpeg?raw=true)

我们发现，当使用`word-wrap: break-word;`时，如果这个时候文本溢出，它会首先尝试挪到下一行，看看下一行的宽度够不够，不够的话才会进行单词内的断句。而使用`word-break:break-all`时，他会直接进行单词内的断句。