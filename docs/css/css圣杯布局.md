[原文链接](https://www.jianshu.com/p/2fe0e6953d0f)

基本的HTML布局：

``` html
<div class="container">
    <div class="main"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```

1. 三列的左右两列分别定宽 200px 和 200px，中间部分 main 设置100%撑满

``` css

* {

    padding: 0;
    margin: 0;
}

.container>div {
    height: 200px;
}

.left {
    width: 200px;
    background: red;
}

.right {
    width: 200px;
    background: blue;
}

.main {
    width: 100%;
    background: green;
}
```

![](/public/images/css1.jpg)

1. 设置全部左浮动，现在 main 由于width是100%，所以占据了一整行。

``` css
.container>div {
    float: left;
    height: 200px;
}
```

![](/public/images/css2.jpg)

1. left 元素设置 margin-left:-100%; 拉回行头

``` css
.left {
    margin-left: -100%;
    width: 200px;
    background: red;
}
```

> 设置 margin-left 为负值会让元素自身位置发生变化，由于浮动的关系，元素被往左拉了一个 main 元素的宽度(100%)故回到了开头。

![](/public/images/css3.jpg)

4. right元素设置`margin-left: -200px;`拉回行尾：

``` css
.right {
    width: 200px;
    background: blue;
    margin-left: -200px;
}
```

![](/public/images/css4.jpg)

5. 现在的问题就是左右两边的元素覆盖了 main 元素的内容，我们可以给容器 container 加上两边 padding：

``` css
.container {
    padding: 0 220px;
}
```

![](/public/images/css5.jpg)

6. 设置相对定位

在设置了 padding  后，左右元素都被挤了进来，我们可以设置 position:relative 解决，因为浮动元素已经脱离了文档流，所以不能设置 absolute 。 通过设置 left 和 right 元素的相对位置，实现定位：

完整 CSS 代码：

``` css

* {

    padding: 0;
    margin: 0;
}

.container {
    padding: 0 220px;
    /* 步骤 5*/
}

.container>div {
    float: left;
    /* 步骤2*/
    height: 200px;
    position: relative;
    /* 步骤 6*/
}

.left {
    width: 200px;
    background: red;
    margin-left: -100%;
    /* 步骤 3*/
    left: -220px;
    /* 步骤 6*/
}

.right {
    width: 200px;
    background: blue;
    margin-left: -200px;
    /* 步骤 4*/
    right: -220px;
    /* 步骤 6*/
}

.main {
    width: 100%;
    background: green;
}
```
