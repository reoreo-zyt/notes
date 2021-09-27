重点看下：

* flex 方案
* gird 方案

首先创建基本的HTML布局和最基本的样式。

``` html
<div class="wrapper wrapper-inline-block">
    <div class="left">
        左边固定宽度，高度不固定 </br> </br></br></br>高度有可能会很小，也可能很大。
    </div>
    <div class="right">
        这里的内容可能比左侧高，也可能比左侧低。宽度需要自适应。</br>
        基本的样式是，两个div相距20px, 左侧div宽 120px
    </div>
</div>
```

基本的 CSS 样式如下：

``` css
.wrapper {
    padding: 15px 20px;
    border: 1px dashed #ff6c60;
}

.left {
    width: 120px;
    border: 5px solid #ddd;
}

.right {
    margin-left: 20px;
    border: 5px solid #ddd;
}
```

# 1. 双 `inline-block` 方案：

``` css
.wrapper-inline-block {
    box-sizing: content-box;
    font-size: 0;
    /* 消除空格的影响 */
}

.wrapper-inline-block .left,
.wrapper-inline-block .right {
    display: inline-block;
    vertical-align: top;
    /* 顶端对齐 */
    font-size: 14px;
    /* 需要给子元素重新设置 */
    box-sizing: border-box;
}

.wrapper-inline-block .right {
    width: calc(100% - 140px);
    /* 动态计算右侧盒子的宽度 */
}
```

缺点：

* 需要知道左侧盒子的宽度，两个盒子的距离，还要设置各个元素的 box-sizing
* 需要消除空格字符的影响
* 需要设置 `vertical-align: top` 满足顶端对齐

# 2. 双 `float` 方案

``` css
.wrapper-double-float {
    overflow: auto;
    /* 清除浮动 */
    box-sizing: content-box;
}

.wrapper-double-float .left,
.wrapper-double-float .right {
    float: left;
    box-sizing: border-box;
}

.wrapper-double-float .right {
    width: calc(100% - 140px);
}
```

缺点：

* 需要知道左侧盒子的宽度，两个盒子的距离，还要设置各个元素的 box-sizing
* 父元素需要清除浮动，个人建议：使用伪元素清除浮动

# 3. `float+margin-left` 方案

``` css
.wrapper-float {
    overflow: hidden;
    /* 清除浮动 */
}

.wrapper-float .left {
    float: left;
}

.wrapper-float .right {
    margin-left: 150px;
}
```

* 需要清除浮动
* 需要计算右侧盒子的 `margin-left`

# 4. 使用 `absolute+margin-left` 方法

``` css
.wrapper-absolute .left {
    position: absolute;
}

.wrapper-absolute .right {
    margin-left: 150px;
}
```

缺点：

* 使用了绝对定位，若是用在某个 div 中，需要更改父容器的 position
* **没有清除浮动的方法**，若左侧盒子高于右侧盒子，就会超出父容器的高度。因此只能通过设置父容器的`min-height`来放置这种情况。

# 5. 使用 `float+BFC` 方法

``` css
.wrapper-float-bfc {
    overflow: auto;
}

.wrapper-float-bfc .left {
    float: left;
    margin-right: 20px;
}

.wrapper-float-bfc .right {
    margin-left: 0;
    overflow: auto;
}
```

原理：利用了左侧浮动，但是右侧盒子通过 `overflow: auto` ；形成了 BFC，因此右侧盒子不会与浮动的元素重叠。

缺点：

* 父元素需要清除浮动

# 6. `flex` 方案

``` css
.wrapper-flex {
    display: flex;
    align-items: flex-start;
}

.wrapper-flex .left {
    flex: 0 0 auto;
}

.wrapper-flex .right {
    flex: 1 1 auto;
}
```

实际开发中使用的比较多是这种方案，代码少，使用简单。

> **注意**： flex 容器的一个默认属性值： `align-items: stretch` 。这个属性导致了列等高的效果。为了让两个盒子高度自动，需要设置 `align-items: flex-start; `

# 7. `grid` 方案

``` css
.wrapper-grid {
    display: grid;
    grid-template-columns: 120px 1fr;
    /* 定义每一列的列宽 */
    align-items: start;
    /* 设置单元格内容的垂直位置（上中下） */
}

.wrapper-grid .left,
.wrapper-grid .right {
    box-sizing: border-box;
}

.wrapper-grid .left {
    grid-column: 1;
    /* grid-column属性是grid-column-start和grid-column-end的合并简写形式 */
}

.wrapper-grid .right {
    grid-column: 2;
}
```

注意：

* `grid`布局也有**列等高**的默认效果。需要设置: `align-items: start; `。
* `grid`布局还有一个值得注意的小地方和`flex`不同: 在使用`margin-left`的时候，`grid`布局默认是`box-sizing`设置的盒宽度之间的位置。而`flex`则是使用两个div的`border`或者`padding`外侧之间的距离。
