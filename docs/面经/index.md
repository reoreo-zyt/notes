### 0. 常见考查

#### 1. 浏览器输入URL后发生了什么？

[细说浏览器输入URL后发生了什么](https://juejin.cn/post/6844904054074654728)

[常见URL协议](https://blog.csdn.net/WuLex/article/details/89448105)

[超详细 DNS 协议解析](https://juejin.cn/post/6919755385330991112#comment)

[《大前端进阶 安全》系列 HTTPS详解（通俗易懂）](https://juejin.cn/post/6844904127420432391)

[http面试必会的：强制缓存和协商缓存](https://juejin.cn/post/6844903838768431118#heading-0)

[实践这一次,彻底搞懂浏览器缓存机制](https://juejin.cn/post/6844903764566999054)

[作为前端的你了解多少tcp的内容](https://juejin.cn/post/6844903731704791054)

[TCP 请求头](https://blog.csdn.net/jijianshuai/article/details/80883091)

[面试官，不要再问我三次握手和四次挥手](https://juejin.cn/post/6844903958624878606#heading-0)

[我知道的HTTP请求](https://juejin.cn/post/6844903559306166279)

[escape, encodeURI, encodeURIComponent使用场景](https://juejin.cn/post/6893486834500763655)

[图解 HTTP 笔记（四）——HTTP 状态码](https://juejin.cn/post/6844903891838992392#heading-2)

* 浏览器输入 URL 后都发生了什么？

1. 合成 URL
2. DNS 域名解析
4. 建立 TCP 连接
4. 浏览器（http）缓存
5. 发送 HTTP 请求，服务器处理请求，返回响应结果
6. 关闭 TCP 连接，四次挥手
7. 浏览器渲染

URL 是统一资源定位符，通常由三部分组成：传输协议、主机域名、资源文件名。浏览器根据用户输入信息判断是搜索还是网址。

> 传输协议有：http(s)://（超文本传输协议）  file:///（获取本地文件协议）   ftp:// （传输文件协议） 

DNS 域名解析协议，将域名转换成 ip 地址。他们之间的映射关系保存在本地缓存中和网络上的各种域名解析服务器中。

* 首先搜索缓存

  * 搜索浏览器的 DNS 缓存，缓存中维护一张域名与 IP 地址的对应表；chrome 对每个域名会默认缓存60s；
  * 继续搜索操作系统的 DNS 缓存；（用户自己配置的 hosts 文件。）
  
* 操作系统将域名发送至本地域名服务器；（本地域名服务器查询自己的 DNS 缓存，查找成功则返回结果；）

* 本地域名服务器向上级域名服务器进行迭代查询；

  * 本地域名服务器向**根域名服务器**发起请求，返回顶级域名服务器的地址；
  * 本地域名服务器拿到这个**顶级域名服务器**的地址后，就向其发起请求，获取**权限域名服务器**的地址；
  * 本地域名服务器根据权限域名服务器的地址向其发起请求，最终得到该域名对应的 IP 地址；

  > 主机和本地域名服务器之间的查询方式是**递归查询**；
  >
  > 本地域名服务器和其他域名服务器之间的查询方式是**迭代查询**，防止根域名服务器压力过大；



建立TCP连接：

首先，会判断是不是 https 的，如果是，会在网络模型上增加一层 SSL / TLS 层，服务端和客户端的信息传输都会通过TLS进行加密，所以传输的数据都是加密后的数据。

进行三次握手，建立TCP连接。

三次握手的目的是为了检验客户端和服务端双方的接收能力和发送能力是否正常。建立一个TCP连接时，需要客户端和服务器总共发送3个包。

刚开始客户端处于 Closed 的状态，服务端处于 Listen 状态。 进行三次握手：

* 第一次握手：客户端给服务端发一个 SYN=1 的报文，并指明客户端的初始化序列号seq = x。此时客户端处于 `SYN_SEND` 状态。
* 第二次握手：服务器收到客户端的 SYN 报文之后，会以自己的 SYN 报文作为应答，也指定自己的初始化序列号seq = y。同时把客户端的序列号加一作为 ack 确认序号的值。（ack = x + 1）此时服务器处于 `SYN_RCVD` 的状态。
* 第三次握手：客户端收到 SYN 报文之后，会发送一个 ACK 报文，ack 的值为以客户端序列号加一（ack = y + 1）客户端处于 `ESTABLISHED` 状态。服务器收到 ACK 报文之后，也处于 `ESTABLISHED` 状态

> ACK：此标志表示应答域有效；
>
> SYN：表示同步序号，用来建立连接。SYN标志位和ACK标志位搭配使用，当连接请求的时候，SYN=1，ACK=0；连接被响应的时候，SYN=1，ACK=1；

![三次握手.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/8/16da9fd28a45bd19~tplv-t2oaga2asx-watermark.awebp)

> 为什么两次握手不行？
>
> 第一次握手：服务端可以知道客户端发送能力、服务端接收能力正常；
>
> 第二次握手：客户端可以知道服务端的接收、发送能力，客户端的接收、发送能力是正常的。不过此时服务器并不能确认客户端的接收能力是否正常。
>
> 第三次握手：服务端可以知道客户端的接收、发送能力正常，服务器自己的发送、接收能力也正常。



浏览器（http）缓存：

浏览器再向服务器请求资源时，首先判断是否命中强缓存，再判断是否命中协商缓存。

强缓存与缓存时间相关，即响应头 expires 和 cahe-control。

当强缓存没有命中的时候，浏览器会发送一个请求到服务器，服务器根据 header 中的部分信息来判断是否命中协商缓存。如果命中，则返回 304 ，告诉浏览器资源未更新，可使用本地的缓存。如果没有命中，就返回最新的资源。

> * expires 是 **http1.0** 时的规范，值为绝对时间，代表着这个资源的失效时间。但是容易导致缓存混乱；
>
> * Cache-Control 是 **http1.1** 的规范，利用该字段的 **max-age** 值来进行判断，它是一个**相对时间**。
>
> **Cache-Control 与 Expires 可以在服务端配置同时启用，同时启用的时候 Cache-Control 优先级高。**

> * Last-Modify/If-Modify-Since
>   * 缺点是不能周期性使用缓存
> * ETag/If-None-Match
>   * 返回的是一个校验码。ETag 可以保证每一个资源是唯一的
>   * **Last-Modified 与 ETag 是可以一起使用的，服务器会优先验证 ETag，一致的情况下，才会继续比对 Last-Modified，最后才决定是否返回 304。**



发送 HTTP 请求，服务器处理请求，返回响应结果

发送 get 请求，使用地址栏访问的和使用ajax的get请求本质上都是一样的，只是使用ajax我们可以设置http请求头，而使用地址栏访问的是由浏览器添加默认的请求头。



TCP 的连接的拆除需要发送四个包，因此称为四次挥手(Four-way handshake)，客户端或服务器均可主动发起挥手动作。

刚开始双方都处于 ESTABLISHED 状态，假如是客户端先发起关闭请求。四次挥手的过程如下：

* 第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于 `FIN_WAIT1` 状态。等待服务端的确认。（FIN=1，序号seq=u）
* 第二次挥手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 +1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 `CLOSE_WAIT` 状态。（ACK=1，确认号ack=u+1，序号seq=v）客户端收到服务端的确认后，进入FIN_WAIT2（终止等待2）状态，等待服务端。
* 第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 `LAST_ACK` 的状态。 即服务端没有要向客户端发出的数据，服务端发出**连接释放报文段**（FIN=1，ACK=1，序号seq=w，确认号ack=u+1），服务端进入LAST_ACK（最后确认）状态，等待客户端的确认。
* 第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 +1 作为自己 ACK 报文的序列号值，此时客户端处于 `TIME_WAIT` 状态。需要过一阵子以确保服务端收到自己的 ACK 报文之后才会进入 CLOSED 状态，服务端收到 ACK 报文之后，就处于关闭连接了，处于 `CLOSED` 状态。 即客户端收到服务端的连接释放报文段后，对此发出**确认报文段**（ACK=1，seq=u+1，ack=w+1），客户端进入TIME_WAIT（时间等待）状态。此时TCP未释放掉，需要经过时间等待计时器设置的时间2MSL后，客户端才进入CLOSED状态。



浏览器的主要进程：

* 主进程
* 第三方插件进程
* GPU
* 渲染进程
  * GUI 渲染线程
    * 负责渲染浏览器界面,解析 HTML,CSS,构建 DOM 树和 RenderObject 树,布局和绘制等。
    * 重绘（Repaint）或由于某种操作引发回流(reflow)时,该线程就会执行。
    * GUI 渲染线程与 JS 引擎线程是互斥的
  * js 引擎线程
    * v8
    * 解析 Javascript 脚本,运行代码。
    * GUI 渲染线程与 JS 引擎线程是互斥的
  * 事件触发线程
    * 控制事件循环
    * 当 JS 引擎执行代码块如 setTimeOut 时（也可来自浏览器内核的其他线程,如AJAX 异步请求等）,会将对应任务添加到事件线程中
  * 定时触发器线程
    * setInterval 与 setTimeout 所在线程
    * 浏览器定时计数器并不是由 JavaScript 引擎计数的,（因为 JavaScript 引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确）
    * 计时完毕后,添加到事件队列中,等待 JS 引擎空闲后执行
    * W3C 在 HTML 标准中规定,规定要求 setTimeout 中低于 4ms 的时间间隔算为 4ms。
  * 异步 http 请求线程
    * 在 XMLHttpRequest 在连接后是通过浏览器新开一个线程请求。
    * 将检测到状态变更时,如果设置有回调函数,异步线程就产生状态变更事件,将这个回调再放入事件队列中。再由 JavaScript 引擎执行。

浏览器渲染流程

![workflow](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/7/16f7ee2d9a5667b3~tplv-t2oaga2asx-watermark.awebp)

1. 解析 HTML 文件,构建 DOM 树,同时浏览器主进程负责下载 CSS 文件
2. CSS 文件下载完成,解析 CSS 文件成树形的数据结构,然后结合 DOM 树合并成 RenderObject 树
3. 布局 RenderObject 树 （Layout/reflow）,负责 RenderObject 树中的元素的尺寸,位置等计算
4. 绘制 RenderObject 树 （paint）,绘制页面的像素信息
5. 浏览器主进程将默认的图层和复合图层交给 GPU 进程,GPU 进程再将各个图层合成（composite）,最后显示出页面



#### 2. 前端安全

[浅说 XSS 和 CSRF](https://juejin.cn/post/6844903638532358151#comment)

[反射型xss实战演示](https://blog.csdn.net/huli870715/article/details/8615473)

[关于csrf,什么是csrf,怎么防范它?](https://juejin.cn/post/6844903653757698062)

[前端面试—Http请求头中Referer的含义和作用](https://juejin.cn/post/6875118674785599501)

* XSS
  * Cross Site Script 跨站脚本攻击
  * 指攻击者通过恶意脚本对客户端网页进行篡改，在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。
  * 类型
    * 存储型
      * 数据库中存有的存在XSS攻击的数据，返回给客户端。（若数据未经过任何转义。被浏览器渲染。就可能导致XSS攻击；）
      * 危害更大，不需要用户手动触发。
      * 最典型的例子就是留言板。
    * 反射型
      * 诱使用户点击一个恶意链接，注入脚本进入被攻击者的网站。
      * 攻击者可以注入任意的恶意脚本进行攻击，能获取用户隐私数据（如cookie）
      * 比如搜索框
    * DOM型
      * DOM型XSS其实是一种特殊类型的反射型XSS，完全依赖于客户端。
      * 通过 js 将数据输出到html中
      * 攻击者伪造连接，点击后执行恶意 js 代码。
  * 防范 XSS 攻击
    * CSP （内容安全策略 Content-Security-Policy HTTP头部）
    * HttpOnly （浏览器将禁止页面的Javascript 访问带有 HttpOnly 属性的Cookie。）
    * 检查变量的输入输出
      * 对于用户的任何输入要进行检查、过滤和转义。
      * 在变量输出到 HTML 页面时，可以使用编码或转义的方式来防御 XSS 攻击。

* CSRF 

  * Cross Site Request Forgery，跨站请求伪造
  * 利用存在cookie里的登录信息进行攻击。

  > CSRF 攻击简单地利用了一个事实：浏览器发起请求时，将自动携带目标站点的 cookie。

  ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/8/8/1651a22ce6858fd9~tplv-t2oaga2asx-watermark.awebp)

  * 防范
    * Get 请求不对数据进行修改
    * Cookie 设置 `SameSite` 属性。（设置 Cookie 不随着跨域请求发送）
    * 对于需要防范 CSRF 的请求，我们可以通过验证 请求头 Referer 来判断该请求是否为第三方网站发起的。
    * 请求时附带验证信息，比如验证码或者 token

#### 3. 事件循环

* 什么是浏览器事件循环
  * js 代码执行过程中，代码会依次放入执行栈中执行，同时还依靠任务队列来搞定某些代码的执行。整个执行过程，就叫做事件循环过程。

* 任务队列
  * 宏任务
    * script(整体代码)
    * setTimeout
    * setInterval
    * I/O
    * UI render
  * 微任务
    * process.nextTick
    * Promise
    * Async/Await(实际就是promise)

> 一次事件循环只执行处于宏任务队首的任务，执行完成后，立即执行微任务队列中的所有任务。
>
> 第一次执行异步任务的时候会先清空微任务队列，然后才是本次事件循环中的宏任务，然后是下次事件循环的微任务被清空，再是宏任务，如此循环往复

* 注意 async/await 的执行顺序，分两种情况
  * 如果 await 后面直接跟的为一个变量，可以简单理解为promise.then(await下面的代码)
  * 如果 await 后面跟的是一个异步函数的调用，直接跳出async1函数，执行其他代码。然后回到async1函数去执行剩下的代码，把await后面的代码注册到微任务队列当中。

* 例子

看一段代码：

```js
async function async1(){
    await async2()
    console.log('async1 end')
}

async function async2(){
    console.log('async2 end')
}

async1()

setTimeout(function() {
   console.log('setTimeout') 
},0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})
```

* script 载入，放入宏任务队列，放入执行栈执行；
* async1  函数放入执行栈中执行，异步函数 async1 放入微任务队列。（如果await跟的是异步函数的调用，则直接退出代码，到最后执行）执行同步代码 async2，输出 `async2 end` ；
* setTimeout 放入宏任务队列；promise 的回调函数放入为微任务队列；执行栈输出 `Promise`；
* 执行宏任务里的所有微任务，输出 `async1 end、 promise1、 promse2`
* 执行宏任务，输出 `setTimeout`

> async2 end
> Promise
> async1 end
> promise1
> promise2
> setTimeout
>
> 注意：整个js脚本是一次宏任务；
>
> 注意：async\await 的使用；await后面的函数执行完毕时，await会产生一个微任务(Promise.then是微任务)



* nodejs的事件循环
  * 事件循环是 node 处理非阻塞 I/O 操作的机制，node中事件循环的实现是依靠的libuv引擎。
  * node 中也有宏任务和微任务，与浏览器中的事件循环类似
    * 宏任务
      * script(整体代码)
      * setTimeout
      * setInterval
      * I/O
    * 微任务
      * process.nextTick(与普通微任务有区别，在微任务队列执行之前执行)
      * new Promise().then(回调)等。
    * 阶段（主要在三个阶段处理异步任务）
      * timers（定时器检测阶段）setTimeout、setInterval 里面的回调函数。
      * poll（轮询阶段）检索新的 I/O 事件;执行与 I/O 相关的回调
      * check（）setImmediate() 回调函数在这里执行
    * node 和 浏览器 eventLoop的主要区别
      * 浏览器中的微任务是在每个相应的宏任务中执行的，而nodejs中的微任务是在不同阶段之间执行的。

#### 4. 跨域

[10种跨域解决方案（附终极大招）](https://juejin.cn/post/6844904126246027278#heading-5)
[反向代理和正向代理区别](https://www.cnblogs.com/taostaryu/p/10547132.html)

* 什么是同源？

同源是指"协议+域名+端口"三者相同。

* 为什么要有同源？

如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。

* 同源策略限制的内容有？

Cookie LocalStorage IndexedDB 等存储性内容；
DOM节点；
Ajax请求被浏览器拦截；

* 允许跨域加载资源的标签？

`img`
`link`
`script`

* 解决方案
  * Cors 跨域资源共享
    * 设置额外的 Http 请求头允许跨域请求；
    * 有简单请求和复杂请求
      * 简单请求
        * get post
        * ...
      * 复杂请求
        * 会预先发出 options 请求（预检请求，发送一个试探请求验证是否可以和服务器跨域通信）；
  * node 正向代理
    * 利用服务端请求不会跨域
    * devServer proxy（webpack）
  * nginx 反向代理
    * proxy_pass（nginx.conf）
  * JSONP 
    * 主要就是利用了 script 标签没有跨域限制
    * 仅支持 GET 方法
    * 方式
      * 前端定义解析函数（例如 jsonpCallback=function(){....}）
      * 通过 params 形式包装请求参数，并且声明执行函数(例如 cb=jsonpCallback)（/api/jsonp?msg=hello&cb=jsonpCallback）
      * 后端获取前端声明的执行函数（jsonpCallback），并以带上参数并调用执行函数的方式传递给前端。
  * webScoket 持久连接

#### 5. http 状态码

[搞懂 HTTP 重定向 - 如何优雅地使用 301](https://juejin.cn/post/6901246149802328078)

1XX 临时响应
2XX 成功处理
3XX 重定向
4XX 客户端请求错误
5XX 服务器错误

常见状态码：

* 200 成功处理，并返回资源
* 204 成功处理，但没有返回资源
* 301 永久重定向
* 302 临时性重定向（访问baidu.cn 返回302）
* 304 服务端资源未修改，直接使用客户端未过期的缓存
![缓存](https://camo.githubusercontent.com/24d6e4fcfb4b4a51cb03cfb67695e9ba4c5e413530b2bda2a4749b412293c960/687474703a2f2f70332e7168696d672e636f6d2f743031636533326164386561623934356138372e706e67)
* 400 客户端请求有语法错误
* 401 未授权，请求需要用户验证
* 403 请求资源的访问被服务器拒绝
* 404 无法找到请求资源
* 500 服务端在执行请求时发生错误
* 503 服务端在停机维护

#### 6. 常见正则面试题

请写出一个正则来处理数字千分位，如12345替换为12,345

```js
// 非正则
let str = '123456789.123';

console.log(parseFloat(str).toLocaleString(undefined, { maximumFractionDigits: 3 }));

function formatNumber(num) {
    num = num.toString()
    let reg = num.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g
    return num.replace(reg, '$1,')
}

console.log(formatNumber(123456789));
```

### 1. 面经

#### 1.1 为什么要有进程和线程

参考：

[js为什么是单线程](https://juejin.cn/post/6844903849837215758)

[为什么要使用线程？与进程相比有哪些好处](https://blog.csdn.net/qq_36631758/article/details/53900401)

[有了进程为什么还要引入线程](https://zhidao.baidu.com/question/1952484864709870148.html)

> * 什么是进程？什么是线程？
> 
> 进程：是cpu分配资源的最小单位；线程：是cpu调度的最小单位；（对于浏览器而言，每打开一个tab页面，其实就是新开了一个进程，在这个进程中，还有ui渲染线程，js引擎线程，http请求线程等。所以，浏览器是一个多进程的。）
> 
> * 进程和线程之间的关系？
> 
> 线程是建立在进程的基础上的，一个进程中可以有多个线程。
>
> * 线程的好处 
>
> 从操作系统上看：线程的切换花销更小（线程间切换的所需时间远远小于进程间切换所需要的时间）；从用户的角度看，有些程序需要线程。（比如聊天，一个线程是响应用户输入，一个线程是响应对方输入。如果没有多线程，那么只能你说一句我说一句，你不说我这里就不能动，我还不能连续说。）

#### 1.2 js的单线程的好处？为什么不是多线程

主要和js的用途有关，js是浏览器的脚本语言，主要是实现用户与浏览器的交互，以及操作 dom；如果是多线程，会带来复杂的同步问题。（举个例子：如果js被设计了多线程，如果有一个线程要修改一个dom元素，另一个线程要删除这个dom元素，此时浏览器就会一脸茫然，不知所措。为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。）

单线程的好处是可以确保任务执行的顺序。（以网页加载为例，GUI渲染线程和js引擎线程如果是多线程，就会导致页面和js逻辑混乱。或者两个线程同时对一个DOM结点进行修改和删除操作，则无法判断以哪个线程为准。）

#### 1.3 js 的函数在内存中的存储

说明堆栈数据结构，js简单数据类型、复杂数据类型（对象）的存储；考虑深浅拷贝；
> 数组和函数在内存的存储和对象一致；

[js 数据在内存中的存储](https://juejin.cn/post/6844904042271883277)

#### 1.4 说一下数据结构的堆栈和内存中的堆栈

[【JavaScript】数据结构与内存中的堆和栈](https://juejin.cn/post/6844903858607489031)

[最详细版图解优先队列（堆）](https://juejin.cn/post/6844903826856607757)

[[译] 理解 JavaScript 中的执行上下文和执行栈](https://juejin.cn/post/6844903682283143181)

#### 1.5 说一下堆排序详细

[前端进阶算法9：看完这篇，再也不怕堆排序、Top K、中位数问题面试了](https://juejin.cn/post/6844904179278823437)

什么是堆（完全二叉树、大顶堆、小顶堆）？如何建立小顶堆、大顶堆？

> * 将原序列（n个）转化成一个大顶堆
> * 设置堆的有效序列长度为 n
> * 将堆顶元素（第一个有效序列）与最后一个子元素（最后一个有效序列）交换，并有效序列长度减1
> * 堆化有效序列，使有效序列重新称为一个大顶堆
> * 重复以上2步，直到有效序列的长度为 1，排序完成

#### 1.6 Vue 的 mixin 讲讲

[Vue.js 高级概念：Mixins，自定义指令，过滤器，过渡，状态管理和服务端渲染](https://juejin.cn/post/6844903872289308686#heading-1)

[Vue3.0 新特性以及使用经验总结](https://juejin.cn/post/6940454764421316644)

mixin 出来的原因？使用 mixin 的问题？

* Vue-router 守卫
  * 全局守卫
    * router.beforeEach
    * router.beforeResolve
    * router.afterEach
  * 路由独享守卫
    * beforeEnter
  * 组件内守卫 
    * beforeRouteEnter
    * beforeRouteUpdate
    * beforeRouteLeave

[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)

#### 1.7 nodejs了解多少？

nodejs 由js v8引擎，网络、磁盘涉及底层的由libuv处理。

nodejs可以支持高并发；（js事件循环）

从开发者的角度看，nodejs 是单线程的。因为js代码运行在 v8 引擎上。nodejs 还有I/O线程存在（网络I/O、磁盘I/O），这些I/O线程是由更底层的 libuv 处理，这部分线程对于开发者来说是透明的。

单线程架构的优势和劣势：

优势：

* 单线程省去了线程间切换的开销
* 线程同步的问题，线程冲突的问题的也不需要担心

劣势：

* 没法充分利用 cpu 的资源（起步都是 4 核）
* 单线程，一旦崩溃，应用就挂掉了（pm2管理进程）

[面试一定会问到的-js事件循环](https://juejin.cn/post/6844903968292749319#comment)

* 主线程
* 工作线程
* 任务队列
  * 宏任务
    * setTimeout
    * setInterval
  * 微任务
    * Promise(重点)
    * process.nextTick(nodejs)

在执行 js 代码的时候，同步代码会放到主线程执行栈中进行，遇到异步代码，则放到工作线程执行。（比如setTimeout时间到了，ajax请求得到响应）工作线程会将回调函数放到任务队列中。当主线程执行完栈中代码，就会检查任务队列将其放到执行栈中。

> 一次事件循环只执行处于宏任务队首的任务，执行完成后，立即执行微任务队列中的所有任务。
>
> 第一次执行异步任务的时候会先清空微任务队列，然后才是本次事件循环中的宏任务，然后是下次事件循环的微任务被清空，再是宏任务，如此循环往复



#### 1.8 数据劫持怎么实现

[「查漏补缺」Vue2.0 源码重写『数据劫持』【面试必备】](https://juejin.cn/post/6882210480040263693)

* 数据劫持的目的：

不仅仅简单的改变数据，在数据变化的时候进行拦截，让视图也绑定上改变的数据；

// TODO: 

#### 1.9 箭头函数能不能当作构造函数，为什么

[详解箭头函数和普通函数的区别以及箭头函数的注意事项、不适用场景](https://juejin.cn/post/6844903801799835655)
[重学 JS | 箭头函数为什么不能用做构造函数？](https://juejin.cn/post/6973181948327903245)

* 箭头函数没有 prototype；
* 箭头函数的 this 继承自第一个外层函数的this，如果没有，this指向window；

为什么不能当做构造函数？

* 构造函数生成实例需要 new 关键字；
* new 关键字做了什么？
  * 创建空对象p `var p = {}`
  * 将空对象p的原型链指向构造器 Person 的原型 `p.__proto__ = Person.prototype`
  * 将Person()构造函数中的this指向p `Person.call(p)`

> 箭头函数没有prototype。因此不能使用箭头作为构造函数，也就不能通过new操作符来调用箭头函数。

#### 1.10 localStorage有没有同源限制?

#### 1.11 CSRF攻击?

#### 1.12 登录验证怎么做的？

[傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.cn/post/6844904034181070861)

说明 api 的编写过程

* 代码规范
  * ESLint Prettier
* 日志记录
  * winston morgan （作为中间件引入 app.ts）
* mongoose 连接数据库
* CRUD 逻辑分层
  * models层 对应数据库实体层（对应mongodb数据库的集合）
  * service层 用来完成主要的功能设计，比如注册、登录
  * controller层 请求和响应控制
* 使用 bcrypt 避免密码明文存储

登录验证的过程：

说明cookies sessions token 然后使用了jwt

* 创建用户和验证登录都返回用户的 id 还有 jwt token(使用 jsonwebtoken 库生成)
* 使用创建 token 的私钥和提取请求头 Authorization Bearer token验证，如果发生错误，则意味着无法通过私钥解密；

#### 1.13 路由组件怎么缓存

keep-alive

缓存全部路由，把router-view用keep-alive包裹起来
缓存部分路由，在路由里配置meta对象，定义一个布尔值keepAlive，使用$route.meta.keepAlive决定是否缓存

> 切换路由链接时，前一个路由组件对象会被销毁掉，下次切换回来时，又是一个新的路由组件对象

#### 1.14 computed和data区别

computed 是计算属性，计算后的属性值有缓存，data里的数据通过插值表达式计算会重复计算；

#### 1.15 cookie和session区别

* 安全性：session比cookie安全，session是存在服务端的，cookie暴露在浏览器内部；
* 存取值类型不同：cookie只能存取字符串，session可以存取任意类型数据；
* 有效期不同：Cookie可以设置长时间保存；
* 存储大小不同：单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源。

#### 1.16 怎么禁止前端使用cookie

[浅谈Js 操作Cookie，以及HttpOnly 的限制](https://zhuanlan.zhihu.com/p/36197012)

一般来说，只有服务器操作 Cookie 才能保证一些必要的安全。设置HttpOnly限制前端获取到cookie值
当使用document.cookie时会自动过滤掉有httpOnly的cookie值

#### 1.17 怎么实时刷新列表

* 定义一个定时器 setInterval
* 在组件销毁后清除定时器；

```js
data(){    
    return {      
        timer:0    
    };  
},  
mounted(){    
    if(this.timer){      
        clearInterval(this.timer)    
    }else{      
        this.timer = setInterval(()=>{       
         // 调用相应的接口，渲染数据        
        console.log('hello')      
        },30000)    
    }  
},  
destroyed(){    
    clearInterval(this.timer)  
},
```

#### 1.18 websocket

[WebSocket 教程](https://www.ruanyifeng.com/blog/2017/05/websocket.html)
[WebSocket 原理浅析与实现简单聊天](https://juejin.cn/post/6844904001654226958#heading-0)

* 轮询

短轮询（Polling）：
浏览器端每隔几秒钟向服务器端发送 HTTP 请求

长轮询（Long-Polling）：
客户端发送请求后服务器端不会立即返回数据，服务器端会阻塞请求连接不会立即断开，直到服务器端有数据更新或者是连接超时才返回

* 什么是websocket?

是一种网络通信协议，浏览器与服务器进行全双工通讯的网络技术

* 为什么需要websocket?

HTTP 协议有一个缺陷：通信只能由客户端发起。做不到服务器主动向客户端推送信息。

![websocket](https://www.ruanyifeng.com/blogimg/asset/2017/bg2017051502.png)

* `new WebSocket('ws://localhost:9000')`
* onopen 监听连接成功
* onmessage 监听服务端消息(接收消息)
* onerror  监听连接失败
* onclose 监听连接关闭

