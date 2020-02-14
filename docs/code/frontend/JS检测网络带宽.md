---
title: JS检测网络带宽
---

### 1、方法一

第一种思路是 **加载一张图片，通过的加载时长和图片的大小来计算出网络带宽** 

有了这个思路，我们可以参考如下代码（部分参考自 github 上的[debloper/bandwidth.js](https://gist.github.com/debloper/7296289)）：

```js
function measureBW(fn) {
    var startTime, endTime, fileSize;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 2){
            startTime = Date.now();
        }
        if (xhr.readyState === 4 && xhr.status === 200) {
            endTime = Date.now();
            fileSize = xhr.responseText.length;
            var speed = fileSize  / ((endTime - startTime)/1000) / 1024;
            fn && fn(Math.floor(speed))
        }
    }

    xhr.open("GET", "https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png", true);
    xhr.send();
}

measureBW((speed)=>{
    console.log(speed + " KB/sec");  //215 KB/sec
})
```

### 2、方法二

但是考虑到http请求需要建立连接，以及等待响应，这些过程也会消耗一些时间，所以以上的方法可能不会准确的检测出网络带宽。

我们可以同时发出多次请求，来减少http请求建立连接，等待响应的影响，参考如下代码：

```js
function measureBW(fn,time) {
    time = time || 1;
    var startTime, endTime, fileSize;
    var count = time ;
    var _this = this;
    function measureBWSimple () {
        
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if(!fileSize){
                    fileSize = xhr.responseText.length;
                }
                count --;
                if(count<=0){
                    endTime = Date.now();
                    var speed = fileSize * time  / ((endTime - startTime)/1000) / 1024;
                    fn && fn(Math.floor(speed));
                }
            }
        }
        xhr.open("GET", "https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png", true);
        xhr.send();
    }
    startTime = Date.now();
    for(var x = time;x>0;x--){
        measureBWSimple()
    }
}

measureBW((speed)=>{
    console.log(speed + " KB/sec");  //913 KB/sec
},10)
```

经王二测试，第二种方法得到的结果要比方法一得到的结果明显高出不少。

> 事实上，前两种还要额外设置 http 请求头来禁止使用本地缓存（开发测试下可以在控制台Network面板下点击禁用缓存），要不然图片加载一次后就不会在去服务器加载，自然也测不出网络的带宽.

### 3、方法三

在 [Chrome65+](https://www.chromestatus.com/feature/6338383617982464) 的版本中，添加了一些原生的方法可以检测有关设备正在使用的连接与网络进行通信的信息。

参考如下代码，我们就可以检测到网络带宽：

```js
function measureBW () {
    return navigator.connection.downlink;
}
measureBW() ;
```

`navigator.connection.downlink` 会返回以（兆比特/秒）为单位的有效带宽估计值(参考[MDN](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)),这和我们常用的（KB/sec）有所差别，所以我们需要再做一下单位换算，参考如下代码：

```js
function measureBW () {
    return navigator.connection.downlink * 1024 /8;   //单位为KB/sec
}
measureBW() ;
```

我们还可以通过 `navigator.connection` 上的 `change` 事件来监听网络带宽的变化：
```js
navigator.connection.addEventListener('change', measureBW());
```

参考文章：

[MDN NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
[Network Information API Sample](https://googlechrome.github. io/samples/network-information/)
[Kbps、KB、Mbps单位换算](https://blog.csdn.net/foart/article/details/8193288)