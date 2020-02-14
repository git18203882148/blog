---
title: Progressive Web App(PWA)
---

## 一、前期介绍

### 1、简单介绍

PWA的中文名叫做**渐进式网页应用**，早在2014年， W3C 公布过 `Service Worker` 的相关草案，但是其在生产环境被 `Chrome` 支持是在 2015 年。因此，如果我们把 PWA 的关键技术之一 `Service Worker` 的出现作为 `PWA` 的诞生时间，那就应该是 2015 年。

自 2015 年以来，`PWA` 相关的技术不断升级优化，在用户体验和用户留存两方面都提供了非常好的解决方案。`PWA` 可以将 `Web` 和 `App` 各自的优势融合在一起：渐进式、可响应、可离线、实现类似 `App` 的交互、即时更新、安全、可以被搜索引擎检索、可推送、可安装、可链接。

**需要特别说明的是，`PWA` 不是特指某一项技术，而是应用了多项技术的 `Web App`。其核心技术包括 `App Manifest`、`Service Worker`、`Web Push`，等等。**

### 2、为什么W3C和谷歌在推广这项技术

这就要从前端的现状说起：

Native APP 用起来很流畅，但是也有其天然的基因缺陷：
>* 由于其天生封闭的基因，内容无法被索引
>* 用户 80% 的时间被 Top3 的超级 App 占据，对于站点来说，应用分发的性价比也越来越不划算
>* 要使用它，首先还需要下载几十兆上百着兆的安装包

WEB前端虽然天生具有开放的基因，但是很多时候页面会卡顿，用户体验不佳。虽然社区之前也做过很多努力，例如`virtual dom`、`spa`、混合编程、用`canvas`将整个页面画出来，用户体验也有了很大的改善，但是仍然无法解决几个重要的问题：
>* 离线时用户无法使用
>* 无法接收消息推送
>* 移动端没有一级入口

W3C和谷歌看到了这些问题，于是推出了`PWA`。

### 3、PWA的核心目标

`PWA`的核心目标就是提升 Web App 的性能，改善 Web App 的用户体验。媲美native的流畅体验，将网络之长与应用之长相结合。

## 二、特点

### 1、PWA的特点

PWA具有以下一些特点：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/10.png?raw=true)

这边有一个关于PWA特点的[列表清单](https://developers.google.com/web/progressive-web-apps/checklist#exemplary)，有兴趣的同学可以点进去看看.

### 2、特点详解

#### （1）、可安装

1、可安装指的是可以像原生APP在主屏幕上留有图标。

2、但是这需要我们提供 `Web app manifest`，`manifest.json` 是一个简单的JSON文件，我们在 `html` 页面如下引用他：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/12.png?raw=true)

它描述了我们的图标在主屏幕上如何显示，以及图标点击进去的启动页是什么，它的JSON格式如下所示：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/13.png?raw=true)

其中：

>* `start_url` 可以设置启动网址
>* `icons` 会帮我萌设置各个分辨率下页面的图标
>* `background_color` 会设置背景颜色， Chrome 在网络应用启动后会立即使用此颜色，这一颜色将保留在屏幕上，直至网络应用首次呈现为止。
>* `theme_color` 会设置主题颜色
>* `display` 设置启动样式

关于`manifest.json`里字段更加具体的含义，感兴趣的同学可以参考[MDN文档](https://developer.mozilla.org/en-US/docs/Web/Manifest)或者谷歌开发者文档里的[这篇文章](https://developers.google.com/web/fundamentals/web-app-manifest/)

3、实际上 [豆瓣移动端](https://m.douban.com/page/vhn1tgl)就是一个`PWA`应用，如果我们用高版本的浏览器打开，就会发现有横幅提示，不过需要注意的是，IOS似乎还不支持，以下王二用安卓手机来做一个演示：

打开豆瓣后，浏览器会提示添加到主屏幕：
![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/14.png?raw=true)

点击确定后，他会提示添加成功，然后在主屏幕上留有一个豆瓣的图标。

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/15.png?raw=true)

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/16.png?raw=true)

#### （2）、离线使用

1、`PWA` 另一项令人兴奋的特性就是可以离线使用,其背后用到的技术是 `Service worker` ;

2、`Service worker`实际上是一段脚本，在后台运行。作为一个独立的线程，运行环境与普通脚本不同，所以不能直接参与 Web 交互行为。`Service Worker` 的出现是正是为了使得 `Web App` 也可以做到像 `Native App` 那样可以离线使用、消息推送的功能。

我们可以把`Service worker`当做是一种客户端代理，

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/17.png?raw=true)

3、我们来看看如何注册一个 `Service Worker`

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/18.png?raw=true)

关于`Service Worker`更加详细的介绍，感兴趣的同学可以参考[MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker)或者Github上的[Basic Service Worker Sample](https://googlechrome.github.io/samples/service-worker/basic/index.html)这篇介绍。

4、 当然 `Service Worker` 也有生命周期，参考下图：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/19.png?raw=true)

关于 `Service Worker` 生命周期的详细介绍可以参考下面这张图：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/20.png?raw=true)

关于`Service Worker` 生命周期更加详细的介绍，感兴趣的同学可以参考[MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

#### （3）、消息推送

消息推送具体可以参考谷歌的官方教程[Your First Web Push Notification](https://developers.google.com/web/fundamentals/codelabs/push-notifications/),里面有详细的代码Demo和说明，以及相应的后台配置（带好梯子）。

## 3、开发者如何了解是否具备这些特点

说了这么多，那我们开发者如何了解一个网页是否具备了 `PWA` 的一些特点呢？

这时候谷歌开发者工具可以帮上我们的忙，在 `Chrome`浏览器的开发者工具里有一个`Audits`面板，它可以帮我们检测网页是否具备了PWA的一些特点：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/21.png?raw=true)

## 三、有哪些企业已经在使用PWA？

1、国内已经有[豆瓣](https://m.douban.com/)、[饿了么](https://h5.ele.me/)使用了部分PWA技术；

2、国外用PWA的企业相对较多，例如[Twitter](https://mobile.twitter.com/home)、[Filpboard](https://flipboard.com/);

3、特别需要注意的是Twitter ，Twitter 在 2017 年上线了 `Twitter Lite PWA`，其获得了相当惊人的收益：

>* 平均用户停留时长增长 65%
>* Web 站点发推的数量增长 75%
>* 跳出率降低 20%

Twitter Lite 能取得这样的成绩，归功于 PWA 的新技术和用户体验至上的设计原则：它通过 Service Worker 缓存文件，让页面可以离线，同时降低网络消耗；通过 Web Push 接受服务器推送的消息；采用 App Shell 的设计模型，配合 Service Worker 能让页面瞬间展现。

4、另外一些采用了PWA的网站可以参考[这个链接](https://pwa.rocks/)

## 四、代码细节

### 1、代码可以参考的是谷歌的官方教程

1、[Your First Progressive Web App](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/)会帮我们了解如何从头构建一个PWA应用。
2、[Debugging Service Workers](https://developers.google.com/web/fundamentals/codelabs/debugging-service-workers/)会辅导我们如何调试`Service Worker`。

### 2、缓存策略
有缓存可以优化用户体验，但是如果没有合理的缓存策略，我们会发现我们的网站将会很难更新。

在用户重新加载新的`Service Worker`的时候，我们需要将之前旧的资源文件都删掉,如下图所示：

![Alt text](https://github.com/WangYuLue/pic_of_blog/blob/master/1801/11.png?raw=true)

更多的缓存策略有兴趣的同学可以参考这篇文章 -- [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/#cache-then-network)

### 3、官方工具

除了前面提到的手工编写 `Service Worker` 脚本, Google 提供了 `sw-toolbox` 和 `sw-precache` 两个工具方便快速生成 `service-worker.js` 文件:

>* [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) 可以用来生成配置使 PWA 在安装时进行静态资源的缓存
>* [sw-toolbox](https://github.com/GoogleChromeLabs/sw-toolbox) 提供了动态缓存使用的通用策略, 这些动态的资源不合适用 sw-precache 预先缓存。

## 五、小结

Progressive Web App仍处于初级阶段，国内普及度还不够，但我们不可忽视其背后的的技术，以及对前端全新的定位。或许它会像十年前的AJAX那样重新改变前端的生态。

## 参考文章（部分链接需要带好梯子）

[谷歌开发者网站关于PWA的搜索结果](https://developers.google.com/s/results/?q=pwa&p=%2Fweb%2F)
[Your First Progressive Web App](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/)
[Exemplary Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist#exemplary)
[The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/#cache-then-network)
[Your First Web Push Notification](https://developers.google.com/web/fundamentals/codelabs/push-notifications/)
[Debugging Service Workers](https://developers.google.com/web/fundamentals/codelabs/debugging-service-workers/)
[PWA网站清单列表](https://pwa.rocks/)
[PWA是否能带来新一轮大前端技术洗牌？](https://www.juhe.cn/news/index/id/2406)
[PWA 入门: 理解和创建 Service Worker 脚本](https://zhuanlan.zhihu.com/p/25524382)
[web-app-manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)
[Basic Service Worker Sample](https://googlechrome.github.io/samples/service-worker/basic/index.html)
['ServiceWorker'MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker)
['ServiceWorker'MDN文档](https://developer.mozilla.org/en-US/docs/Web/Manifest)
['Using_Service_Workers'MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)