三栏布局，顾名思义就是两边固定，中间自适应。

首先创建基本的HTML布局和最基本的样式：

``` html
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="main"></div>
</div>
```

基本的 CSS 样式如下：

``` css

* {

    padding: 0;
    margin: 0;
}

.left {
    width: 100px;
    height: 200px;
    background-color: red;
}

.right {
    width: 200px;
    height: 200px;
    background-color: blue;
}

.main {
    height: 200px;
    background-color: green;
}
```

# 1. float 方案

``` css
.container-float {
    overflow: auto;
    /*清除浮动*/
}

.container-float .left {
    float: left;
}

.container-float .right {
    float: right;
}

.container-float .main {
    margin-left: 120px;
    margin-right: 220px;
}
```

缺点：

* 父元素需要清除浮动
* 主要内容无法最先加载，当页面内容较多时会影响用户体验

# 2. 绝对定位方案

``` css
.container-absolute {
    position: relative;
}

.container-absolute .main {
    margin: 0 120px;
}

.container-absolute .left {
    position: absolute;
    left: 0;
    top: 0;
}

.container-absolute .right {
    position: absolute;
    right: 0;
    top: 0;
}
```

简单实用，并且主要内容可以优先加载。

缺点：如果中间栏含有最小宽度限制，或是含有宽度的内部元素，当浏览器宽度小到一定程度，会发生层重叠的情况。

# 3. BFC 方案

BFC 规则有这样的描述：BFC 区域，不会与浮动元素重叠。因此我们可以利用这一点来实现 三栏布局。

``` css
.container-float-bfc .left {
    float: left;
    margin-right: 20px;
}

.container-float-bfc .right {
    float: right;
    margin-left: 20px;
}

.container-float-bfc .main {
    overflow: hidden;
}
```

缺点：

* 父元素需要清除浮动
* 主要内容模块无法最先加载，当页面中内容较多时会影响用户体验

# 4. flex 方案

HTML布局：

``` html
<div class="container">
    <div class="main"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```

CSS 样式：

``` css
.container-flex {
    display: flex;
}

.container-flex .main {
    flex-grow: 1;
}

.container-flex .left {
    order: -1;
    flex: 0 1 100px;
    margin-right: 20px;
}

.container-flex .right {
    flex: 0 1 200px;
    margin-left: 20px;
}
```

简单实用，未来的趋势。
