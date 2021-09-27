# 1. BFC是什么？

BFC 即 Block Formatting Contexts (块级格式化上下文)，它是指一个独立的块级渲染区域，只有块级参与，该区域拥有一套渲染规则来约束块级盒子的布局，具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

# 2. 触发条件

BFC是一块渲染区域，那这块渲染区域到底在哪，它又是有多大，这些由生成BFC的元素决定，CSS2.1中规定满足下列CSS声明之一的元素便会生成BFC；

* 根元素或其它包含它的元素
* float 属性不为 none
* overflow 属性不为 visible
* display 属性为 inline-block、table-cell、table-caption、flex、inline-flex
* position 属性为 absolute 或 fixed

# 3. BFC 渲染规则

* 内部的Box会在垂直方向，一个接一个地放置；
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠（塌陷），与方向无关; 
* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float的元素区域重叠；
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此；
* 计算BFC的高度时，浮动元素也参与计算；

# 4.  BFC在布局中的应用

* ## 防止margin重叠

根据BFC的第二条规则：Box垂直方向的距离由margin决定，属于同一BFC的两个Box会发生margin重叠

实例: 两个相邻盒子垂直方向margin重叠 解决办法: 可以在其中一个p上包裹容器，然后触发其BFC，这样两个p就不在同一个BFC，因此就不会发生重叠；

``` css
< !DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport"content="width=device-width, initial-scale=1.0"><title>Document</title><style>.wrap {
    overflow: hidden;
    /* 新的 BFC */
}

p {
    background: #ccc;
    width: 200px;
    margin: 100px;
}

</style></head><body><p>haha</p><div class="wrap"><p>hehe</p></div></body></html>
```

* ## 清除内部浮动

根据BFC布局规则第六条：计算BFC的高度时，浮动元素也参与计算

实例: 当子元素均浮动时，其无法撑开父元素 解决办法: 让父元素生成BFC

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .parent {
            border: 5px solid #ccc;
            width: 300px;
            overflow: hidden;
            /* 形成 BFC */
        }

        .child {
            background: red;
            width: 100px;
            height: 100px;
            float: left;
        }
    </style>
</head>

<body>
    <div class="parent">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>

</html>
```

* ## 阻止元素被浮动元素覆盖

根据BFC布局规则的第三条： 每个元素的margin box的左边，与包含块border box的左边相接触（对于从左到右的格式化，否则相反）。即使存在浮动也是如此；

按照BFC布局的第四条规则： BFC的区域不会与float box重叠

实例: 自适应两栏布局

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .aside {
            width: 200px;
            height: 200px;
            background: #ccc;
            float: left;
        }

        .main {
            background: grey;
            height: 300px;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>

</html>
```

## 总结

以上几个例子都体现了BFC的第五条规则： BFC就是页面上一个隔离的独立容器，容器内的子元素不会影响外部的元素，反之亦然；

因为BFC内部的元素不会影响外部的元素，因此当BFC外部有浮动元素时，BFC为了不影响内部Box的布局，BFC会通过变窄，避免与浮动元素重叠；同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动元素的高度。避免margin重叠也是如此。
