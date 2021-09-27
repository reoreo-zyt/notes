# 1. 语义化标记的好处

编写语义标记的一些好处如下：

* 搜索引擎会将其内容视为影响页面搜索排名的重要关键字

> **SEO** (搜索引擎优化) 是一种让网站在搜索引擎结果中更加清晰, 也帮助我们将搜索结果更靠前

* 屏幕阅读器可以将其用作路标，以帮助视障用户浏览页面
* 查找有意义的代码块比通过具有或不具有语义或命名空间的类的无尽 div 搜索要容易得多

# 2. 语义化的元素

语义化的元素：

* [`article`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article)
* [`aside`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside)
* [`details`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/details)
* [`figcaption`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption)
* [`figure`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure)
* [`footer`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer)
* [`header`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header)
* [`main`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main)
* [`mark`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/mark)
* [`nav`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav)
* [`section`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section)
* [`summary`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/summary)
* [`time`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time)

# 3. 具体的用法

## 3.1 article

**`<article>`** 元素表示文档、页面、应用或网站中的独立结构。

比如论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。

* 此元素只具有[全局属性](https://developer.mozilla.org/en-US/docs/HTML/Global_attributes)。
* 每个`<article>`，通常包括标题（`<h1> - <h6>`元素）作为`<article>`元素的子元素。
* 当`<article>`元素嵌套使用时，则该元素代表与外层元素有关的文章。例如，代表博客评论的`<article>`元素可嵌套在代表博客文章的`<article>`元素中。
* `<article>`元素不能成为[`address`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/address)元素的子元素。
* `<article>`元素的发布日期和时间可通过[`time`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time)元素的属性 `pubdate` 表示。

## 3.2 aside

`<aside>` 元素表示一个和其余页面内容几乎无关的部分，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。

通常表现为侧边栏或者标注框（call-out boxes）。

## 3.3 details

`<details>` 元素可创建一个挂件，仅在被切换成展开状态时，它才会显示内含的信息。

``` html
<details style="border:1px solid #aaa">

    <summary>Details</summary>
    Something small enough to escape casual notice.

</details>
```

## 3.4 figure

`<figure>` 元素代表一段独立的内容, 经常与说明（caption） `<figcaption>` 配合使用, 并且作为一个独立的引用单元。

## 3.5 footer

`<footer>` 元素表示最近一个[章节内容](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#defining_sections_in_html5)或者[根节点](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#sectioning_root)（sectioning root ）元素的页脚。

一个页脚通常包含该章节作者、版权数据或者与文档相关的链接等信息。

## 3.6 header

`<header>` 元素用于展示介绍性内容，通常包含一组介绍性的或是辅助导航的实用元素。

它可能包含一些标题元素，但也可能包含其他元素，比如 Logo、搜索框、作者名称，等等。

## 3.7 main

`<main>` 元素呈现了文档的 `<body>` 或应用的主体部分。主体部分由与文档直接相关，或者扩展于文档的中心主题、应用的主要功能部分的内容组成。

## 3.8 mark

表示为引用或符号目的而标记或突出显示的文本。 `<mark>` 元素用于 <mark>高亮</mark> 文本

## 3.9 nav

`<nav>` 元素表示页面的一部分，其目的是在当前文档或其他文档中提供导航链接。

导航部分的常见示例是菜单，目录和索引。

## 3.10 section

`<section>` 元素表示一个包含在HTML文档中的独立部分，它没有更具体的语义元素来表示，一般来说会有包含一个标题。

> 如果元素的内容作为一个独立的有意义的集合，[ `article` ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article)元素可能是更好的选择。
