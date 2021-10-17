## 1. 自我介绍

## 2. 讲一下302状态码

[HTTP 之重定向](https://juejin.cn/post/6844904176762224653)
[ajax与302响应](https://www.cnblogs.com/dudu/p/ajax_302_found.html)

* 概念
302 状态码是临时重定向，代表旧网址的资源仍然可以访问，只是临时从旧网址跳转到新网址；

* 缓存
301 永久重定向会缓存到磁盘中，302默认不缓存；

* 搜索引擎
对于搜索引擎而言，它会抓取新网站的内容，但是网址会被保存为旧网址的；

* 安全问题
302 会导致 URL 劫持的问题，搜索引擎排名算法在遇到 302 时，并不能判断新旧网址哪一个更合适，如果别人的网站做了一个302重定向到你的网站，由于某些原因，搜索的结果显示的是他的网站，但是内容却是你的；

* 回调问题
服务器返回302状态码给浏览器时，不会进行ajax的回调处理，而是先执行302临时重定向，然后从返回的结果中读取location中url的值，并向其发送get请求，收到结果后才会进行回调；

如果想从302中使用location的值是做不到的。

> 解决方案：可以在后端将302响应改为json响应，返回json数据；

```js
return Json(new { status = 302, location = "/oauth/respond" });
```

## 3. TCP三次握手第三次握手失败会有什么后果

先说明TCP三次握手

服务器会重新发送SYN和ACK，如果重传指定次数到了后，仍然未收到ACK应答，那么一段时间后，server自动关闭这个连接。

后果就是利用这个漏洞会造成SYN-Flood攻击，也就是DDOS攻击，不发送确认连接的信息给服务器，服务器就无法完成第三次握手，如果这些半连接信息很多，大到服务器没有空余处理用户正常请求，服务器就无法工作了；

## 4. 讲一下WebSocket

websocket 是浏览器和服务器进行全双工通讯的网络通信协议；

出现背景是由于http协议的缺陷：通讯只能由客户端发起。这就导致一个问题：比如我想要实现服务端推送、或者聊天室的功能将很难办到；

如果是http的话，要想实现聊天室的功能，就必须不断地发送ajax请求获取到最新的数据，或者采用长轮询或者长连接；

* `new WebSocket('ws://localhost:9000')`
* onopen 监听连接成功
* onmessage 监听服务端消息(接收消息)
* onerror  监听连接失败
* onclose 监听连接关闭

## 5. 怎么记录用户的登录状态

博客后台使用的是token验证授权，注册和登录都会但会一个jwt

* 前端调后端的登陆接口，发送用户名和密码；
* 后端收到请求，验证用户名和密码（密码不是明文的），验证成功，就给前端返回一个token；
* 前端拿到token，将token存储到vuex中，用了vuex的一个插件，在存储vuex数据时，也会存在localStorage中，然后跳转路由页面；
* 每次跳转路由，就判断 localStorage 中有无 token ，没有就跳转到登录页面，有则跳转到对应路由页面；
* 调后端接口，都要在请求头中加上Authorization Bearer token；
* 后端判断请求头中有无token，有token，就拿到token并验证token，验证成功就返回数据，验证失败（例如：token过期）就返回401，请求头中没有token也返回401；
* 如果前端拿到状态码为401，就清除token信息并跳转到登录页面；
* 调取登录接口成功，会在回调函数中将token存储到vuex中，也存到localStorage；


## 6. 图片优化

[实现图片懒加载(Lazyload)](https://juejin.cn/post/6844903455048335368)

图片懒加载：
利用data-src定义真正的图片链接，监听滚动事件，当用户滚动到看到的图片时，将data-src的值赋给src。

> 如果直接将函数绑定在scroll事件上，当页面滚动时，函数会被高频触发，这非常影响浏览器的性能。

限制触发频率，来优化性能。节流函数：只允许一个函数在N秒内执行一次。

```js
// 简单的节流函数
//fun 要执行的函数
//delay 延迟
//time  在time时间内必须执行一次
function throttle(fun, delay, time) {
    var timeout,
        startTime = new Date();

    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= time) {
            fun.apply(context, args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(fun, delay);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function lazyload(event) {
        for (var i = n; i < imgNum; i++) {
            if (img.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())) {
                if (img.eq(i).attr("src") == "") {
                    var src = img.eq(i).attr("data-src");
                    img.eq(i).attr("src", src);

                    n = i + 1;
                }
            }
        }
    }
// 采用了节流函数
window.addEventListener('scroll',throttle(lazyload,500,1000));
```

压缩

## 7. 事件委托

[addEventListener，jq.on以及事件委托](https://blog.csdn.net/xixi880928/article/details/69230076)

将元素的事件委托给它的父级或者更外级的元素处理；实现机制是事件冒泡。

> 事件冒泡：事件开始由最具体的元素接收，然后逐级向上传播到较为不具体的节点或文档。

不使用事件委托：
* 给每一个列表都绑定相同事件，浪费内存；
* 动态添加元素时，需要重新绑定事件；

> 引出浏览器回流和重绘的概念；性能更好


用父级元素做委托

IE和标准浏览器的兼容性：

IE8 使用attachEvent，其他使用addEventListener
IE e.srcElement，其他使用e.target（事件源）

## 8. DOMContentLoaded和Load事件

[再谈DOMContentLoaded和load](https://www.tripfe.cn/on-domcontentloaded-and-load/)

DOMContentLoaded 事件会在HTML文档被完全加载和解析后被触发；
Load 事件在所有资源被完全加载时触发；

浏览器渲染的过程：

* 根据HTML语法解析HTML文本，将文档中所有的DOM元素构建成DOM树，遇到js同步代码时，构建会暂停，直到脚本执行完毕；
* 同时开启进程下载并构建css树；
* 然后浏览器将DOM树和CSS树合并为Render树，Render树的各个节点会被计算出位置、大小最后渲染出来；

> 在 body 中第一个 script 资源下载完成之前，浏览器会进行首次渲染，将该 script 标签前面的 DOM 树和 CSS树 合并成一棵 Render 树，渲染到页面中。这是页面从白屏到首次渲染的时间节点，比较关键。

script 标签的两个属性defer、async

* async 脚本可能会在DOMContentLoaded事件执行前后触发；（看async脚本什么时候加载完，只有加载完才会执行阻塞html解析）
* defer脚本会延迟到html解析完后才会执行；

> 可以说一下浏览器的回流、重绘；


## 9. for in 和 for of

for in是为遍历对象属性而构建的，不建议与数组一起使用；

> 遍历对象，返回属性名

for of是ES6的语法，用于迭代可迭代对象，比如Array、String；

## 10. 怎么把arguments转换成数组
[类数组转换为数组的方法](https://juejin.cn/post/6948726526812618765)

函数里有个类数组对象 arguments，该对象包含索引和实参；很简单，遍历取值push进定义的空数组就好了。

```js
[Arguments] { '0': 1, '1': 2 }
```

使用数组的slice方法：

```js
//arguments对象的转换
function foo(a, b) {
    // slice返回一个数组
    // 把this指向arguments
    return Array.prototype.slice.call(arguments);
}
console.log(foo(1, 2)); // [1,2]
```

使用 ES6 扩展运算符可以把该对象转为数组；

```js
[...arguments]
```

## 11. computed和watch的区别

[computed和watch的区别](https://juejin.cn/post/6882356511473926152)

[watch及dom的异步更新](https://blog.csdn.net/lv240312/article/details/89323446)

处于性能考虑，dom是异步更新的，并且更新完会执行`$nextTick`的回调函数；

watch执行的是异步函数，如果我们的属性需要在侦听后再执行某个变化,可以使用$nextTick这个API；

watch监听的数据是简单数据类型时，就比较值，值不一样则触发函数；监听的是复杂数据类型，就会比较内存地址，不一样则触发函数；deep表示深监听，immediate 表示监听开始时就触发回调函数；

当我们试图通过数据对象来创造另一个属性时，推荐使用computed，比如计算金钱总额；

当我们试图通过侦听数据对象的改变来做点什么（比如执行一个函数），我们就可以使用watch，在使用watch时尤其要注意其为异步执行的特点。比如跳转路由之类的；

## 12. 二叉树特点

树是由若干个节点组成，节点连接起来就成了树，而二叉树节点由一个数据、两个指针组成；

遍历树、查找深度、查找最大值都可以用递归的思想；

完全二叉树（建堆）、满二叉树、二叉查找树、二叉平衡树、红黑树；

完全二叉树可以构建堆排序；（解释堆排序过程）

二叉查找树的特点可以使我们在查找某个节点时，采用类似二分查找的思想，快速找到某节点；正常情况下时间复杂度是O(logn)，在极端环境下，复杂度是O(n)（变成链表）

平衡树是为了解决二叉查找树退化为链表的情况，而红黑树是为了解决平衡树在插入、删除等操作需要频繁调整的情况。

## 13. 智力题

* 12个砝码中，只有一个砝码跟其他的砝码重量不一样，每次只能称两个，怎么找出那个不一样的砝码

12 个砝码分组，称6次；有一组是不一样的重量，其中一个就是那个不一样的砝码；取这组，从其他组拿一个砝码，编码1，2，3号，称2次即可，13，23。有一个是跟12一样重量；

* 一个5l量杯一个6l量杯（没有刻度），称出3l水

5l水装满，倒入6l量杯，5l水倒满，倒入1l水到6l水中，剩4l水，6l水倒掉，4l倒入6l容器中，装满5l水，倒入4l水，剩3l；

## 14. Vue兄弟节点通信

[Vue3的7种和Vue2的12种组件通信，值得收藏](https://juejin.cn/post/6999687348120190983)

父子通信：

* props（父传子）/$emit（子传父）
* .sync（父传子数据双向绑定）
* $children （拿到子组件中所有数据和方法）/ $parent（包含父节点中所有数据和方法）
* ref（定义在普通DOM元素或者子组件上，通过this.$refs调用）
* $attrs （接收除了props声明外的所有绑定属性）/ $listeners（接收除了带有.native事件修饰符的所有事件监听器）

兄弟通信：

* EventBus
* Vuex
* $parent

跨层级组件通信：

* provide（提供给后代组件方法、数据）/inject（接收）
* EventBus（定义一个文件，定义new vue，在别的地方引入，$emit 发送事件，$on监听触发回调函数）
* Vuex
* $attrs （在子组件使用v-bind='$attrs'可以在孙组件那里得到）/ $listeners
* $root


## 15. CSRF 以及如何防范？

## 16. 说下操作系统中页面调度算法

[操作系统——页式存储管理](https://www.cnblogs.com/wkfvawl/p/11700301.html)
[操作系统的知识点整理](https://juejin.cn/post/6844903957098151950)

内存管理方面；虚拟页式存储管理；

在作业运行前，只把初始需要的一部分页面装入内存块里，运行中需要访问自己地址空间中的但当前不在内存的页面时产生缺页中断，由缺页中断服务程序将所需的页面调入内存，若此时内存中没有空闲物理块安置请求调入的新页面，则系统按预定的置换策略自动选择一个或一些在内存的页面，把它们换出到外存。

淘汰哪一页？

最佳淘汰算法：每次都淘汰以后永不使用的，或者过最长的时间后才会被访问的页面。
先进先出淘汰算法——FIFO：队列，淘汰掉内存中最老的页面。
最近最久未使用算法(LRU, Least Recently Used）：内存中最久未使用的页面被淘汰。

* 计时法
* 堆栈法

## 17. 说下localStorage

## 18. 如何判断DOM节点加载完成

所有资源加载完成后，load事件触发

## 19. DOMContentLoaded和onload有啥区别

## 20. Webpack中的如何配置开发环境和生产环境

## 21. Webpack中的PublicPath和OutputPath有啥区别？

[webpack中output中path和publicPath区别详解](https://blog.csdn.net/haofandedaima/article/details/116144829)

output.publicPath: webpack 提供一个非常有用的配置，该配置能帮助你为项目中的所有资源指定一个基础路径，它被称为公共路径(publicPath)。

* path是文件打包dist的位置，而publicPath是资源文件的公共头部url。
* path是绝对路径；

## 22. nodejs

## 23. 数据劫持怎么实现？

## 24. 箭头函数能不能当作构造函数，为什么

## 25. 如果构造函数内部用call或者apply绑定this，那么实例对象的this指向哪里？

```js
function F() {
    this.name = "111"
    F.call(obj)
}
var obj = {name: "222"}
var a = new F()//报错
```

## 26. localStorage有没有同源限制

## 27. CSRF攻击（这个突然想不起来了，就说了只记得XSS）

## 28. 如何适配的H5

## 29. js的执行环境

## 30.  js时间循环

## 31. 作用域

## 32. let 和 var区别

## 33. 组合继承

## 34. 原型链

## 35. 原型链的顶部是什么

## 36. 浏览器缓存

## 37. 权限系统

## 38. 具体细化的组件如何做权限