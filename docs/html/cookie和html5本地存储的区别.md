浏览器端常用的存储技术是 cookie 、localStorage 和 sessionStorage。

* cookie 其实最开始是服务端用于记录用户状态的一种方式，由服务器设置，在客户端存储，然后发起同源请求时，发送给服务端。cookie 最多能存储 4 k 数据，它的生存时间由 expires 属性指定，并且 cookie 只能被同源的页面访问共享。
* localStorage 是 html5 提供的一种浏览器本地存储的方法，它一般能够存储 5M 或者更大的数据。它和 sessionStorage 不同的是，除非主动删除它，否则它不会失效，并且 localStorage 也只能被同源页面所访问共享。
* sessionStorage 也是 html5 提供的一种浏览器本地存储的方法，它借鉴了服务器端 seesion 的概念，代表的是一次会话中所保存的数据。它一般能够存储 5M 或者更大的数据，它在当前窗口关闭后失效了，并且 sessionStorage 只能被同一个窗口的同源页面所访问共享。

表格汇总：

|   **特性**   |                          **cookie**                          |     **localStorage**     |             **sessionStorage**              |
| :----------: | :----------------------------------------------------------: | :----------------------: | :-----------------------------------------: |
| 数据生命周期 |              一般由服务器生成，可以设置过期时间              | 除非被清理，否则一直存在 | 仅在当前会话有效， 关闭页面或浏览器后被清除 |
| 数据存储大小 |                              4K                              |            5M            |                     5M                      |
| 与服务端通信 | 每次都会携带在同源 的http请求头中, 如果使用cookie保存过多 数据会带来性能问题的 |          不参与          |                   不参与                    |
|     用途     |                 服务端生成，用于表示用户身份                 |    用于浏览器缓存数据    |             用于浏览器缓存数据              |
