# 1. vue 知识量化

* 基础语法
* 组件化开发
* `vue-cli`
* `vue-router`
* `vuex`
* 网络封装 `axios`
* `vuejs` 原理相关

# 2. 基础语法

## 2.1 vue 的认识和及入门案例

* 渐进式框架
* 解耦视图和状态
* 可复用的组件
* 前端路由技术
* 状态管理
* 虚拟 `DOM`

### 2.1.2 hello vue

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app">{{message}}</div>

    <script src="../vue.js"></script>
    <script>
        // 声明式编程
        // 创建Vue实例对象，el属性，data属性
        const app = new Vue({
            el: '#app', //挂载要管理的元素
            data: { //定义数据
                message: 'Hello Vue'
            }
        })
        // 原始js的做法（编程范式：命令式编程）
        // 1. 创建div元素，设置id值
        // 2. 定义一个变量叫message
        // 3. 将message变量放在div元素中显示
        // 4. 修改message数据，再次替换到div
    </script>

</body>

</html>
```

> **注意**：
>
> `{{}}` 为插值操作；
>
> `Vue` 实例对象里 `el` 属性用于挂载要管理的 `DOM` 元素；
>
> `data` 属性用于定义数据；

![](/images/lv-1.jpg)

### 2.1.3 vue 的列表展示

``` html
    <div id="app">
        <ul>
            <!-- 指令v-for遍历data数据movies -->
            <li v-for="movie in movies">{{movie}}</li>
        </ul>
    </div>
    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'hello',
                movies: ['星际穿越', '大话西游', '少年派', '盗梦空间']
            }
        })
    </script>
```

> **注意**： 
>
> 使用了 `v-for` 指令进行循环遍历 vue 实例中 `data` 的数据；

![](/images/lv-2.jpg)

### 2.1.4 计数器的实现

``` html
    <div id="app">
        当前计数:{{counter}}
        <button v-on:click="counter++">+</button>
        <button v-on:click="counter--">-</button>
        <button v-on:click="add">+</button>
        <button v-on:click="sub">-</button>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                counter: 0
            },
            methods: {
                add: function() {
                    this.counter++;
                },
                sub: function() {
                    this.counter--;
                }
            },
            created: function() {
                alert("0");
            },
            mounted: function() {
                setTimeout(() => {
                    alert("1");
                }, 2000);
            }
        })
    </script>
```

> **注意**： 
>
> `v-on` 指令绑定事件，事件为 `click` ；
>
> 绑定的值可以直接对 vue 实例的 `data` 数据进行操作；
>
> 点击后触发 vue 实例里的 `methods` 属性里的函数；
>
> `created`  `mounted` 是 vue 的生命周期；
>
> `v-on:click` 的语法糖写法为 `@cilck` ；

![](/images/lv-1g.gif)

## 2.2 插值的操作与过滤器

### 2.2.1 mustache 语法

即 `{{}}` ，用于获取到挂载的 Vue 实例里的 `data` 数据。

``` html
    <div id='app'>
        <h2>{{message}}</h2>
        <!-- mustache语法中，可以写变量，也可以写简单表达式 -->
        <h2>{{firstName + lastName}}</h2>
        <h2>{{firstName + ' ' + lastName}}</h2>
        <h2>{{firstName}} {{lastName}}</h2>
        <h2>{{counter * 2}}</h2>
    </div>

    <script src='../vue.js'></script>

    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue',
                firstName: "kobe",
                lastName: "bryant",
                counter: 100
            }
        })
    </script>
```

> **注意**： 
>
> mustache 语法中，可以写变量，也可以写简单表达式；
>
> 该语法用于将数据挂载到 DOM 中，相比原生 js 简单方便多了；

![](/images/lv-3.jpg)

### 2.2.3 v-once 指令的使用

``` html
    <div id='app'>
        <h2>{{message}}</h2>
        <h2 v-once>{{message}}</h2>
    </div>

    <script src='../vue.js'></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue'
            }
        })
    </script>
```

> **注意**：
>
> `v-once` 指令会使 `{{}}` 语法生效一次，后面不管怎么改 `data` 里的数据，都不会变；

![](/images/lv-4.jpg)

![](/images/lv-5.jpg)

### 2.2.4 v-html 指令的使用

``` html
    <div id='app'>
        <h2 v-html="url">{{url}}</h2>
    </div>
    <script src='../vue.js'></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue',
                url: '<a href="http://www.baidu.com">百度一下 </a>'
            }
        })
    </script>
```

> **注意**：
>
> `v-html` 指令会把 `{{}}` 语法绑定的值变成相应的 html ，而不是字符串；
>
> 参数为 `string` 类型；

![](/images/lv-6.jpg)

> 没有加 v-html 的情况；

![](/images/lv-7.jpg)

> 加了 v-html 的情况；

### 2.2.5 v-text 指令的使用

``` html
    <div id='app'>
        <h2>{{message}}</h2>
        <h2 v-text="message">Vue</h2>
    </div>

    <script src='../vue.js'></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue'
            }
        })
    </script>
```

> **注意**：
>
> `v-text` 指令会覆盖掉原本标签里的文本内容；

![](/images/lv-8.jpg)

### 2.2.6 v-cloak 指令的使用

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* 属性选择器 */
        [v-cloak] {
            /* display: none; */
            visibility: hidden;
        }
    </style>
</head>

<body>
    <div id='app' v-cloak>
        {{message}}
    </div>
    <script src='../vue.js'></script>
    <script>
        // 在vue解析之前，div中有一个属性v-cloak
        // 在vue解析之后，div中没有一个属性v-cloak
        setTimeout(() => {
            const app = new Vue({
                el: '#app',
                data: {
                    message: 'Hello Vue'
                }
            })
        }, 2000)
    </script>
</body>
```

> **注意**：
>
> 在 vue 解析之后，v-cloak 会消失，因此属性选择器的样式自然就不会生效；

![](/images/lv-2g.gif)

### 2.2.7 过滤器语法

过滤器用于文本格式化。

过滤器可以用在：

* `{{}}`
* `v-bind`

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

可以在一个组件的选项中定义本地的过滤器：

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

## 2.3 动态绑定属性

### 2.3.1 v-bind 的基本使用

``` html
    <div id='app'>
        <!-- v-bind指令后 src属性可以用变量实现动态绑定 -->
        <img v-bind:src="imgUrl" alt="" style="width: 300px;height: 300px;">
        <!-- v-bind语法糖 直接省略-->
        <img :src="imgUrl" alt="" style="width: 300px;height: 300px;">
        {{imgUrl}}
    </div>
    <script src='../vue.js'></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue',
                imgUrl: "https://img20.360buyimg.com/babel/s1180x940_jfs/t1/166920/36/10769/131840/60459e4cE90415057/48ad0f304d301b05.jpg.webp"
            }
        })
    </script>
```

> **注意：**
>
> `v-bind` 可以实现动态绑定属性；
>
> 语法糖为直接省略；

![](/images/lv-9.jpg)

### 2.3.2 v-bind 动态绑定 class（对象语法）

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .red {
            color: red;
        }

        .black {
            color: black;
        }
    </style>
</head>

<body>
    <div id='app'>
        <!-- 注意class里是对象 -->
        <!-- 绑定方式：对象语法 -->
        <h2 :class="{red: isRed,black: isBlack}">{{message}}</h2>
        <button v-on:click="changeColor">按下换颜色</button>
    </div>
    <script src='../vue.js'></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue',
                isRed: true,
                isBlack: false
            },
            methods: {
                changeColor: function() {
                    if (this.isRed == true) {
                        this.isRed = false;
                        this.isBlack = true;
                    } else if (this.isBlack == true) {
                        this.isRed = true;
                        this.isBlack = false;
                    }
                }
            }
        })
    </script>
</body>

</html>
```

> **注意：**
>
> class 会根据 vue 实例里的布尔属性值判断是否渲染出这个 class ；
>
> 比如在 `:class="{red: isRed,black: isBlack}"` 里，isRed 为 true，isBlack 为 false；
>
> 这样就能通过数据改变样式；

![](/images/lv-3g.gif)

### 2.3.3 v-bind 动态绑定 class（数组语法）

``` html
    <div id="app">
        <h2 class="title" :class=[active,line]>{{message}}</h2>
        <h2 :class="getClasses()"></h2>
    </div>

    <script src="../vue.js"></script>

    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'f12查看class元素',
                active: 'aaaaaa',
                line: 'bbbbbb'
            },
            methods: {
                getClasses: function() {
                    return [this.active, this.line]
                }
            }
        })
    </script>
```

> 一般来说对象语法较之常用；

![](/images/lv-10.jpg)

### 2.3.4 v-bind 动态绑定 style

``` html
    <div id="app">
        <!-- 注意50px里加上单引，否则会被认为是app的变量 -->
        <h2 :style="{fontSize: finalSize}">{{message}}</h2>
    </div>

    <script src="../vue.js"></script>

    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'hello',
                finalSize: '50px'
            }
        })
    </script>
```

> **注意：**
>
> 数据必须是字符串形式；

![](/images/lv-11.jpg)

### 2.3.5 v-bind 和 v-for 的使用

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active {
            color: red;
        }
    </style>

</head>

<body>
    <!-- 点击列表后，根据下标索引换颜色 -->
    <div id="app">
        <ul>
            <li :class="{active: currentIndex === index}" v-for="(m,index) in movies" @click="isClick(index)">{{index}}-{{m}}</li>
        </ul>
    </div>

    <script src="../vue.js"></script>

    <script>
        const app = new Vue({
            el: '#app',
            data: {
                movies: ['海王', '海尔兄弟', '进击的巨人', '加勒比海盗'],
                currentIndex: 0
            },
            methods: {
                isClick(index) {
                    this.currentIndex = index
                }
            }
        })
    </script>
</body>

</html>
```

> **注意：**
>
> 首先用 v-for 渲染列表；
>
> 之后用 v-bind 动态绑定 class，当 currentIndex === index 时显示 active；
>
> @click 点击触发 currentIndex === index；

![](/images/lv-4g.gif)

## 2.4 计算属性和侦听器

### 2.4.1 计算属性的基本使用

``` html
    <div id="app">
        <h2>{{firstName + ' ' + lastName}}</h2>
        <h2>{{getFullName()}}</h2>
        <h2>{{fullName}}</h2>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                firstName: 'Lebron',
                lastName: 'James'
            },

            // 计算属性
            computed: {
                fullName: function() {
                    return this.firstName + ' ' + this.lastName
                }
            },
            methods: {
                getFullName: function() {
                    return this.firstName + ' ' + this.lastName
                }
            }
        })
    </script>
```

> **注意：**
>
> 计算属性 computed 会进行缓存，因此对数据转化后显示需要计算属性；
>
> computed 的方法中不要加 `()` ；
>
> methods 的方法中要加 `()` ；

### 2.4.2 计算属性的 getter 和 setter

``` html
    <div id="app">
        <h2>{{fullName}}</h2>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                firstName: 'Lebron',
                lastName: 'James'
            },
            computed: {
                fullName: {
                    set: function() {

                    },
                    get: function() {
                        return this.firstName + ' ' + this.lastName;
                        get
                    }
                }
            },
        })
    </script>
```

### 2.4.3 计算属性和 methods 的对比

``` html
    <div id="app">
        <!-- 1. 直接拼接:语法过于繁琐 -->
        <h2>{{firstName}} {{lastName}}</h2>

        <!-- 2. 通过定义methods -->
        <h2>{{getFullName()}}</h2>
        <h2>{{getFullName()}}</h2>
        <h2>{{getFullName()}}</h2>
        <h2>{{getFullName()}}</h2>

        <!-- 3. 通过computed -->
        <h2>{{fullName}}</h2>
        <h2>{{fullName}}</h2>
        <h2>{{fullName}}</h2>
        <h2>{{fullName}}</h2>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                firstName: 'Kobe',
                lastName: 'Bryant'
            },
            methods: {
                getFullName: function() {
                    // 会打印多次
                    console.log('getFullName');
                    return this.firstName + ' ' + this.lastName;
                }
            },
            computed: {
                // 只执行一次
                fullName: function() {
                    console.log('fullName');
                    return this.firstName + ' ' + this.lastName;
                }
            }
        })
    </script>
```

![](/images/lv-12.jpg)

### 2.4.4 计算属性的复杂操作

``` html
    <div id="app">
        <h2>总价格：{{totalPrice}}</h2>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            computed: {
                totalPrice: function() {
                    let sum = 0;
                    // for (let i = 0;i < this.books.length;i++){

                    // }
                    for (let i in this.books) {
                        sum = sum + this.books[i].price;
                    }
                    return sum;
                }
            },
            data: {
                books: [{
                        id: 110,
                        name: 'Unix编程艺术',
                        price: 100
                    },
                    {
                        id: 111,
                        name: '深入理解计算机原理',
                        price: 100
                    },
                    {
                        id: 112,
                        name: '代码大全',
                        price: 100
                    },
                    {
                        id: 113,
                        name: '编译原理',
                        price: 100
                    },
                ]
            }
        })
    </script>
```



![](/images/lv-13.jpg)

### 2.4.5 侦听器

```html
    <div id="watch-example">
        <p>
            Ask a yes/no question:
            <input v-model="question">
        </p>
        <p>{{answer}}</p>
    </div>
    <script src="../vue.js"></script>
    <!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
    <!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
    <script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
    <script>
        var watchExampleVM = new Vue({
            el: '#watch-example',
            data: {
                question: '',
                answer: 'I cannot give you an answer until you ask a question!'
            },
            watch: {
                // 如果 `question` 发生改变，这个函数就会运行
                question: function (newQuestion, oldQuestion) {
                    this.answer = 'Waiting for you to stop typing...'
                    this.debouncedGetAnswer()
                }
            },
            created: function () {
                // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
                // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
                // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
                // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
                // 请参考：https://lodash.com/docs#debounce
                this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
            },
            methods: {
                getAnswer: function () {
                    if (this.question.indexOf('?') === -1) {
                        this.answer = 'Questions usually contain a question mark. ;-)'
                        return
                    }
                    this.answer = 'Thinking...'
                    var vm = this
                    axios.get('https://yesno.wtf/api')
                        .then(function (response) {
                            vm.answer = _.capitalize(response.data.answer)
                        })
                        .catch(function (error) {
                            vm.answer = 'Error! Could not reach the API. ' + error
                        })
                }
            }
        })
    </script>
```

> 注意：
>
> v-model 实现双向绑定；
>
> watch 属性实现了侦听器功能；
>
> this 的指向问题；
>
> lodash 方法的使用；
>
> axios 进行 ajax 请求；

![](../../.vuepress/public/images/lv-6.gif)

## 2.5 事件监听

### 2.5.1 v-on 的基本使用

```html
    <div id="app">
        <h2>{{counter}}</h2>
        <button v-on:click="increment()">点击增加</button>
        <!-- 语法糖写法 当不需要传参时，方法的()可省略-->
        <button @click="decrement">点击减少</button>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                counter: 0
            },
            methods: {
                // ES6对象字面量增强写法
                increment(){
                    this.counter++;
                },
                decrement(){
                    this.counter--;
                }
            }
        })
    </script>
```

> 注意：
>
> 当不需要传参时，methods 的 `()` 也可以省略；
>
> `v-on:click` 语法糖为 `@click`；

### 2.5.2 v-on 的参数问题

```html
    <div id="app">
        <!-- 事件调用的方法没有参数 -->
        <button @click="btn1Click()">按钮1</button>
        <button @click="btn1Click">按钮1</button>  
        
        <!-- 在事件定义时，省略了方法里有的参数,这个时候，Vue会默认将浏览器生产的event事件对象作为参数传入到方法-->
        <button @click="btn2Click">按钮2</button>

        <!-- 方法定义时，我们需要event对象，同时又需要其他参数 -->
        <!-- 在调用方法时，手动获取浏览器参数的event对象 $event -->
        <button @click="btn3Click(123,$event)">按钮3</button>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                
            },
            methods: {
                btn1Click(){
                    console.log("btn1Click");
                },
                btn2Click(event){
                    console.log("----" + event);
                },
                btn3Click(abc,event){
                    console.log("++++" + abc + event);
                }
            }
        })
    </script>
```

> 注意：
>
> 事件定义后，若方法省略了参数，vue 会默认将浏览器生成的 `event` 事件对象作为参数传入到方法中；
>
> 用 `$event` 可以获取到浏览器参数的 `event`  对象；

![](../../.vuepress/public/images/lv-14.jpg)

### 2.5.3 v-on 修饰符的使用

```html
    <!-- 1 -->
    <!-- .stop修饰符的使用 -->
    <div id="app">
        <div @click="divClick">
            aaaaa
            <!-- 阻止冒泡 -->
            <button @click.stop="btnClick">按钮</button>
        </div>

        <!-- 2 -->
        <!-- .prevent修饰符的使用 -->
        <br>
        <!-- action 会在当前页面构建新的 url -->
        <!-- .prevent修饰符在提交页面时不再重载页面 -->
        <form action="baidu">
            <input type="submit" value="提交" @click.prevent="submitClick">
        </form>

        <!-- 3 -->
        <!-- 监听某个键盘的键帽 -->
        <input type="text" @keyUp.enter="keyUp">

        <!-- 4 -->
        <!-- .native监听组件根元素的原生事件 -->
        
        <!-- 5 -->
        <!-- .once只触发一次回调 -->
        <button @click.once="btn2Click">按钮2</button>
    </div>




    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {

            },
            methods: {
                // ES6对象字面量增强写法
                btnClick() {
                    console.log("btnClick");
                },
                divClick() {
                    console.log("divClick");
                },
                submitClick(){
                    console.log("submitClick");
                },
                keyUp(){
                    console.log("keyUp");
                },
                btn2Click(){
                    console.log("btn2Click");
                }
            }
        })
    </script>
```



* `@click.stop` 
  * 阻止冒泡

> 如果没有阻止冒泡，会导致它的父级以上的 `@click` 在接下来触发；

* `@click.prevent` 
  * 提交事件不再重载页面

> 如果没有会导致表单的 `action` 跳转到对应的 url；

* `@keyUp.enter` 
  * 监听某个（在这里为 enter ）键盘的键帽
* `@click.once` 
  * 只触发一次

## 2.6 条件判断

* `v-if`
* `v-else`
* `v-else-if`
* `v-show`

### 2.6.1 v-if 的使用

```html
    <div id="app">
        <h2 v-if="isShow">
            <div>abc</div>
            <div>abc</div>
            <div>abc</div>
            <div>abc</div>
            <div>abc</div>
            <div>abc</div>
            {{message}}
        </h2>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                message:'hello',
                isShow:true
            }
        })
    </script>
```

> 注意：
>
> v-if 的值为 true 时，才渲染相应的 DOM

![](../../.vuepress/public/images/lv15.jpg)

### 2.6.2 v-if 和 v-else 的结合使用

```html
    <div id="app">
        <h2 v-if="isShow">
            <div>abc</div>
            <div>abc</div>
            <div>abc</div>
            <div>abc</div>
            <div>abc</div>
            <div>abc</div>
            {{message}}
        </h2>
        <h1 v-else>isShow为false时，显示我</h1>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                message:'hello',
                isShow:false
            }
        })
    </script>
```

> 注意：
>
> v-else 在 isShow 为 false 时，会渲染 DOM

![](../../.vuepress/public/images/lv16.jpg)

### 2.6.3 v-if 和 v-else-if 和 v-else 的结合使用

```html
    <div id="app">
        <h2 v-if="score>=90">优秀</h2>
        <h2 v-else-if="score>=80">良好</h2>
        <h2 v-else-if="score>=60">合格</h2>
        <h2 v-else>不合格</h2>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                score:99
            }
        })
    </script>
```

> 注意：
>
> v-else-if 其实就是另外的分支，跟原生的 js 条件判断一样；

![](../../.vuepress/public/images/lv17.jpg)

### 2.6.4 用户登录切换的案例

```html
    <div id="app">
        <span v-if='isUser'>
            <label for="username">用户账号</label>
            <input type="text" id="username" placeholder="用户账号">
        </span>
        <span v-else>
            <label for="email">用户邮箱</label>
            <input type="text" id="email" placeholder="用户邮箱">
        </span>
        <button @click='changeUser'>切换类型</button>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                isUser:true
            },
            methods: {
                changeUser(){
                    this.isUser = !this.isUser;
                }  
            },
        })
    </script>
```

> 注意：
>
> 通过条件判断决定展示哪一部分；
>
> 通过事件点击改变条件判断的布尔值；
>
> 由于 vue 虚拟 DOM 的问题，登录切换后 input 输入框的内容并不会消失；（解决：使用 key）

### 2.6.5 用 key 解决 input 复用问题

```html
    <div id="app">
        <span v-if='isUser'>
            <label for="username">用户账号</label>
            <!-- 使用 key 解决复用问题 -->
            <input type="text" id="username" placeholder="用户账号" key="username">
        </span>
        <span v-else>
            <label for="email">用户邮箱</label>
            <input type="text" id="email" placeholder="用户邮箱" key="email">
        </span>
        <button @click='changeUser'>切换类型</button>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                isUser:true
            },
            methods: {
                changeUser(){
                    this.isUser = !this.isUser;
                }  
            },
        })
    </script>
```

![](../../.vuepress/public/images/lv-5.gif)

### 2.6.6 v-show 的使用

```html
    <div id="app">
        <!-- 
            v-if:当条件为false时，包含v-if指令的元素，根本不会出现在DOM中。
            v-show:当条件为false时，v-show只是给我们的元素添加一个行内样式：display:none
         -->

         <!-- 开发中如何选择：
            当需要在显示和隐藏中很频繁时，使用v-show
            只有一次切换时，使用v-if
         -->
        <h2 v-if='isShow' id="v-if">{{message}}</h2>
        <!-- 只有v-show的DOM存在 -->
        <h2 v-show='isShow' id="v-show">{{message}}</h2>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                message:'hello',
                isShow:false
                
            }
        })
    </script>
```

> 注意：
>
> v-if 条件为 false 时，其元素不会出现；
>
> v-show 条件为 false 时，元素还在，会添加行内样式：display:none

![](../../.vuepress/public/images/lv19.jpg)

## 2.7 循环遍历



### 2.7.1 v-for 遍历数组

```html
    <div id="app">
        <!-- 1. 在遍历过程中没有使用索引值 -->
        <ul>
            <li v-for='name in names'>{{name}}</li>
        </ul>

        <!-- 2. 在遍历中获取索引值 -->
        <ul>
            <li v-for='(name,index) in names'>{{index + 1}} {{name}}</li>
        </ul>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                names:['wade','Kobe','james']
            }
        })
    </script>
```

![](../../.vuepress/public/images/lv20.jpg)

### 2.7.2 v-for 遍历对象

```html
    <div id="app">
        <ul>
            <!-- 1. 在遍历对象的过程中，如果只是获取一个值，那么获取到的是value -->
            <li v-for="item in info">{{item}}</li>
        </ul>

        <ul>
            <!-- 2. 获取对象的value和key-->
            <li v-for="(value,key) in info">{{key}}-{{value}}</li>
        </ul>

        <ul>
            <!-- 3. 获取对象的value和key和index -->
            <li v-for="(value,key,index) in info">{{index + 1}} {{key}} {{value}}</li>
        </ul>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                info:{
                    name:'why',
                    age:18,
                    height:188
                }
            }
        })
    </script>
```

![](../../.vuepress/public/images/lv21.jpg)

### 2.7.3 v-for 添加 key

```html
    <!-- key的作用是为了高效更新虚拟DOM -->
    <div id="app">
        <li v-for="item in letters" :key="item">{{item}}</li>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                letters:['A','B','C','D','E']
            }
        })
    </script>
```

> 注意：
>
> 添加 key 是为了高效跟新虚拟 DOM；
>
> 2.6.5 的 key 只是单纯的字符串值；
>
> 此处的 `:key` 需要动态绑定 letters 遍历出来的 item 值；

### 2.7.4 哪些数组是响应式的？

```html
    <div id="app">
        <ul>
            <li v-for="item in letters" :key="item">{{item}}</li>
        </ul>
        <button @click="btnClick">按钮</button>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                letters:['A','B','C','D','E']
            },
            methods: {
                btnClick(){
                    // 1. push方法（响应）
                    // this.letters.push('aaa')

                    // 2. pop方法 删除数组的最后一个元素
                    // this.letters.pop()

                    // 3. shift方法 删除数组的第一个元素
                    // this.letters.shift()

                    // 4. unshift方法 在数组最前面添加元素
                    // this.letters.unshift('aaa')

                    // 5. splice方法 删除元素、插入元素、替换元素
                    // 删除元素 从第零个位置开始，删除n个（如果没有传后面那个参数，则删除全部）
                    // this.letters.splice(0,1)
                    // this.letters.splice(1,3,'m','n','l','x')
                    // this.letters.splice(1,0,'x','y','z')

                    // 6. sort
                    // this.letters.sort()

                    // 7. reverse
                    // this.letters.reverse()

                    // 8. Vue内部实现的方法
                    Vue.set(this.letters,1,'bbbb')
                    
                    // 1. 通过下标索引值修改数组的值 （不响应）
                    // this.letters[0] = 'aaa'
                }   
            }
        })
    </script>
```

## 2.8 v-model 的使用



### 2.8.1 v-model 的基本使用

```html
    <div id="app">
        <!-- v-model的数据的双向绑定 -->
        <input type="text" v-model="message" >
        {{message}}
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                message: 'hello'
            }
        })
    </script>
```

> v-model 实现了数据的双向绑定；

![](../../.vuepress/public/images/lv-7.gif)

### 2.8.2 v-model 的原理

```html
    <div id="app">
        <input type="text" :value="message" @input="message = $event.target.value">
        <h2>{{message}}</h2>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                message:'hello'
            }
        })
    </script>
```

> v-model 实现数据双向绑定原理：
>
> ​	v-bind 动态绑定属性；
>
> ​	v-on 监听 input 事件；
>
> 通过 `$event.target.value` 取得 input 里的值赋值给 message；

### 2.8.3 v-model 的修饰符使用

* `.lazy`
* `.number`
* `.trim`

```html
    <div id="app">
        <!-- 1. lazy修饰符 -->
        <!-- 输入完后按enter才能双向绑定 -->
        <input type="text" v-model.lazy="message">
        <h2>{{message}}</h2>

        <!-- 2. number -->
        <!-- v-model默认为字符串类型，number修饰符可进行类型转换 -->
        <input type="number" v-model.number="age">
        <h2>{{typeof age}}</h2>

        <!-- 3. trim -->
        <!-- 去除输入的空格 -->
        <input type="text" v-model="name">
        <h2>你输入的名字是{{name}}</h2>
    </div>

    <script src="../vue.js"></script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                message:'hello',
                age:'',
                name:''
            }
        })
    </script>
```

# 3. 组件化开发



## 3.1 组件化开发基本内容

组件是可复用的 vue 实例。

### 3.1.1 组件化的基本使用

```html
    <div id="app">
        <my-cpn></my-cpn>
        <my-cpn></my-cpn>
        <my-cpn></my-cpn>
    </div>
    <!-- 组件必须挂载在vue实例下 -->
    <my-cpn></my-cpn>

    <script src="../vue.js"></script>
    <script>
        // 1. 创建组件构造器对象
        const cpnC = Vue.extend({
            template: `    
                <div>
                    <h2>我是标题</h2>
                    <p>内容1</p>
                    <p>内容2</p>
                </div>`
        })

        // 2. 注册组件(全局组件)
        Vue.component('my-cpn', cpnC)

        const app = new Vue({
            el: '#app',
            data: {

            }
        })
    </script>
```

> 注意：
>
> 组件必须挂载在 vue 实例下，否则不会显示；
>
> 通过 `Vue.extend({template:``})` 创建组件构造器对象，再在 `Vue.component()` 里注册（全局）组件；

![](../../.vuepress/public/images/lv22.jpg)

### 3.1.2 全局组件和局部组件

```html
    <div id="app">
        <cpn></cpn>
        <cpn></cpn>
        <cpn></cpn>
    </div>

    <div id="app2">
        <cpn></cpn>
    </div>
    <!-- 组件必须挂载在vue实例下 -->
    <cpn></cpn>

    <script src="../vue.js"></script>
    <script>
        // 1. 创建组件构造器对象
        const cpnC = Vue.extend({
            template: `    
                <div>
                    <h2>我是标题</h2>
                    <p>内容1</p>
                    <p>内容2</p>
                </div>`
        })

        // 2. 注册组件(全局组件，可以在多个Vue实例下挂载)
        // Vue.component('cpn', cpnC)

        const app = new Vue({
            el: '#app',
            data: {

            },
            // 局部组件，在某一个Vue实例里挂载
            components:{
                // cpn使用组件时的标签名
                cpn:cpnC
            }
        })

        const app2 = new Vue({
            el: '#app2',
            data: {

            }
        })
    </script>
```

> 全局组件，可以在多个 Vue 实例下挂载；
>
> 局部组件，只能在定义它的 Vue 实例下挂载，在 Vue 实例下用 `components` 挂载；

![](../../.vuepress/public/images/lv23.jpg)

### 3.1.3 父组件和子组件区别

```html
  <div id="app">
    <cpn2></cpn2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    // 1.创建组件构造器对象
    const cpn1 = Vue.extend({
      template:`
        <div>
          <h2>标题1</h2>
          <p>组件1</p>
        </div>`
    })
    // 组件2中使用组件1
    const cpn2 = Vue.extend({
      template:`
        <div>
          <h2>标题2</h2>
          <p>组件2</p>
          <cpn1></cpn1>
        </div>`,
      components:{
        cpn1:cpn1
      }
    })

    const app = new Vue({
      el:"#app",
      components:{//局部组件创建
        cpn2:cpn2
      }
    })
  </script>
```

> Vue 实例里通过 `components` 创建了局部组件 cpn2；
>
> cpn2 里通过 `components` 创建了它的局部组件 cpn1，它们是父子关系；
>
> 注意 cpn2 里的 cpn1 标签；

### 3.1.4 组件的语法糖注册方式

```html
    <div id="app">
        <cpn1></cpn1>
        <cpn2></cpn2>
    </div>

    <script src="../vue.js"></script>
    <script>
        // 1. 全局组件注册的语法糖,省略Vue.extend


        // const cpnC1 = Vue.extend({
        //     template:`
        //         <div>
        //             <h2>我是标题1</h2>
        //             <p>内容1</p>
        //             <p>内容2</p>
        //         </div>
        //     `
        // })

        Vue.component('cpn1', {
            template: `
                <div>
                    <h2>我是标题1</h2>
                    <p>内容1</p>
                    <p>内容2</p>
                </div>
            `
        })

        const app = new Vue({
            el: '#app',
            data: {

            },
            // 2. 局部注册组件语法糖写法
            components: {
                cpn2: {
                    template: `
                        <div>
                            <h2>我是标题2</h2>
                            <p>内容1</p>
                            <p>内容2</p>
                        </div>
                    `
                }
            }
        })
    </script>
```

> 全局组件注册的语法糖写法，就是省略 `Vue.extend` ，直接使用 `Vue.component()` ；
>
> 局部组件注册的语法糖写法，也是省略 `Vue.extend` ，直接在 Vue 实例里使用 `{template:``}`；

### 3.1.5 组件模板的分离写法（template）与组件 data 数据

```html
    <div id="app">
        <cpn1></cpn1>
        <cpn2></cpn2>
    </div>

    <!-- 1. 通过script标签：Vue定义html模板 -->
    <script type="text/x-template" id="cpn1">
        <div>
            <h2>{{title}}</h2>
            <p>内容</p>
        </div>
    </script>

    <!-- 2. template标签 -->
    <template id="cpn2">
        <div>
            <h2>我是标题2</h2>
            <p>内容</p>
        </div>
    </template>

    <script src="../vue.js"></script>
    <script>
        // 1. 注册全局组件
        Vue.component('cpn1',{
            template:'#cpn1',
            // 组件数据的存放。data属性必须是函数；必须返回对象，对象里存数据
            data(){
                return {
                    title:'我是标题1'
                }
            }
        })

        Vue.component('cpn2',{
            template:'#cpn2'
        })

        const app = new Vue({
            el:'#app',
            data:{
                
            }
        })
    </script>
```

> 通过 template 标签可以实现组件模板分离到 html 中编写，减少耦合；
>
> 组件中的 data 必须是一个函数，返回一个对象；

![](../../.vuepress/public/images/lv25.jpg)

### 3.1.6 组件 data 数据的存放问题

```html
  <div id="app">
    <cpn1></cpn1>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>

    const app = new Vue({
      el: "#app",
      components: { //局部组件创建
        cpn1:{
          template:'<div>{{msg}}</div>',
          data(){
            return {
              msg:"组件的数据存放必须要是一个函数"
            }
          }
        }
      }
    })
  </script>
```

> 组件里的 data 必须是一个函数，返回一个对象；

![](../../.vuepress/public/images/lv26.jpg)

### 3.1.7 组件的 data 必须是函数，返回一个对象

```html
  <div id="app">
    <h2>data不使用函数</h2>
    <cpn1></cpn1>
    <cpn1></cpn1>
    <hr>
    <h2>data使用函数</h2>
    <cpn2></cpn2>
    <cpn2></cpn2>
    <hr>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <template id="cpn1">
    <div>
      <button @click="count--">-</button>
      当前计数：{{count}}
      <button @click="count++">+</button>
    </div>
  </template>
  <template id="cpn2">
    <div>
      <button @click="count--">-</button>
      当前计数：{{count}}
      <button @click="count++">+</button>
    </div>
  </template>
  <script>
    const obj = {
      count:0
    };
    const app = new Vue({
      el: "#app",
      components: { //局部组件创建
        cpn1: {
          template: '#cpn1',
          data() {
            return obj;
          }
        },
        cpn2: {
          template: '#cpn2',
          data() {
            return {
              count: 0
            }
          }
        }
      }
    })
  </script>
```

> cpn1 组件的 data 是一个函数，但是返回了 Vue 实例外部的对象；
>
> ​	会导致所有复用的组件的数据值都会改变；
>
> cpn2 组件的 data 是一个函数，返回了一个对象；
>
> ​	每一个组件的数据都是独立的；

![](../../.vuepress/public/images/lv-8.gif)

## 3.2 组件通信

[vue2.0通信方式大全，看完你就懂了](https://juejin.cn/post/6963805372779855885#heading-7)

### 3.2.1 父组件向子组件传递数据

通过 `props` 向子组件传递数据；

`props` 里的数据可以有数组和对象两种写法；

```html
  <div id="app">

    <cpn :cmovies="movies" :cmessage="message"></cpn>

  </div>

  <template id="cpn">

    <div>
      <ul>
        <li v-for="(item, index) in cmovies" :key="index">{{item}}</li>
      </ul>
      <h2>{{cmessage}}</h2>

    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    function Person(firstName,lastName) {
      this.firstName = firstName
      this.lastName = lastName
    }
    // 父传子：props
    const cpn = {
      template: "#cpn",
      // props: ['cmovies', 'cmessage'],//数组写法
      props: { //对象写法
        // 1.类型限制(多个类使用数组)
        // cmovies:Array,
        // cmessage:String,
        // cmessage:['String','Number'],
        // 2.提供一些默认值，以及必传值
        cmessage: {
          type: String,
          default: 'zzzzz',
          required: true //在使用组件必传值
        },
        //类型是Object/Array，默认值必须是一个函数
        cmovies: {
          type: Array,
          default () {
            return [1, 2, 3, 4]
          }
        },
        // 3.自定义验证函数
        // vaildator: function (value) {
        //   //这个传递的值必须匹配下列字符串中的一个
        //   return ['zzzzz', 'ttttt', 'yyy'].indexOf(value) !== -1
        // }
        // 4.自定义类型
        // cmessage:Person,

      },
      data() {
        return {

        }
      },
      methods: {

      },
    };
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好",
        movies: ["复仇者联盟", "钢铁侠", "星际穿越", "哪吒传奇"]
      },
      components: {
        // 对象属性增强写法，即 cpn:cpn
        cpn
      }
    })
  </script>
```

> 注意子组件里 props 数据不要用驼峰命名；
>
> 在模板里用 `<cpn :cmovies="movies" :cmessage="message"></cpn>` 表示使用父组件的数据；
>
> 注意要用 `v-bind` 动态绑定父组件变量，如果没有，则表明只是个字符串；
>
> `props` 的对象语法可以提供类型限制和默认值；
>
> 默认值如果其类型是数组或者对象，则必须是一个函数； 

![](../../.vuepress/public/images/lv27.jpg)

### 3.2.2 props 的驼峰表示变量的问题

`v-bind` 不支持驼峰，如果一定要使用驼峰，需要在模板里修改，如：`cUser` 改成 `c-user`；

```html
  <div id="app">
    <!-- v-bind不支持驼峰 :cUser改成 :c-User-->
    <!-- <cpn :cUser="user"></cpn> -->
    <cpn :c-user="user"></cpn>
    <cpn :cuser="user" ></cpn>

  </div>

  <template id="cpn">

    <div>
      <!-- 使用驼峰 -->
      <h2>{{cUser}}</h2>
      <!-- 不使用 -->
      <h2>{{cuser}}</h2>


    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>

  <script>
    // 父传子：props
    const cpn = {
      template: "#cpn",
      props: { //对象写法
        //驼峰
        cUser:Object,
        //未使用驼峰
        cuser:Object
      },
      data() {
        return {

        }
      },
      methods: {

      },
    };
    const app = new Vue({
      el: "#app",
      data: {
        user:{
          name:'zzz',
          age:18,
          height:175
        }
      },
      components: {
        cpn
      }
    })
  </script>
```

![](../../.vuepress/public/images/lv28.jpg)

### 3.2.3 子组件向父组件传递数据

通过 `$emit()` 自定义事件：

```html
  <!-- 父组件 -->
  <div id="app">
    <!-- 不写参数默认传递 btnClick 的 item -->
    <cpn @itemclick="cpnClick"></cpn>
  </div>

  <!-- 子组件 -->
  <template id="cpn">
    <div>
      <!-- item 为子组件数据数组里的对象 -->
      <button v-for="(item, index) in categories" :key="index" @click="btnClick(item)">{{item.name}}</button>
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>

  <script>
    // 子组件 cpn
    const cpn = {
      template: "#cpn",
      data() {
        return {
          categories: [{
            id: 'aaa',
            name: '热门推荐'
          },
          {
            id: 'bbb',
            name: '手机数码'
          },
          {
            id: 'ccc',
            name: '家用家电'
          },
          {
            id: 'ddd',
            name: '电脑办公'
          },
          ]
        }
      },
      methods: {
        btnClick(item) {
          console.log(item);
          // 在子组件里自定义事件为 itemclick，然后在模板里使用自定义事件
          // 子组件发射事件到父组件
          this.$emit('itemclick', item)
        }
      },
    };

    // 根组件，即父组件
    const app = new Vue({
      el: "#app",
      data() {
        return {

        }
      },
      methods: {
        cpnClick(item) {
          console.log('cpnClick' + item.name);
        }
      },
      components: {
        cpn
      },
    })
  </script>
```

> 在子组件里通过 `$emit` 自定义事件，然后在子组件模板里（`v-on`）监听该自定义事件；
>
> 注意 `$emit` 自定义事件不能用驼峰变量，不过使用了 vue-cli 脚手架开发就可以了；

![](../../.vuepress/public/images/lv-9.gif)

### 3.2.4 父子组件通信（结合双向绑定）

> `v-model` 的数据双向绑定最好不要绑定 `props` 取到的值，可以通过在组件里的 `data` 进行操作；
>
> 注意 `v-model` 的原理；

```html
   <!-- 父组件 -->
  <div id="app">

    <cpn :number1='num1' :number2='num2' @num1change="num1Change" @num2change="num2Change"></cpn>

    <h2>父组件{{num1}}</h2>
    <input type="text" v-model="num1">
    <h2>父组件{{num2}}</h2>
    <input type="text" v-model="num2">

  </div>

  <!-- 子组件 -->
  <template id="cpn">

    <div>
      <h2>子组件number1{{number1}}</h2>
      <h2>子组件dunber1{{dnumber1}}</h2>
      <input type="text" :value="dnumber1" @input="num1input">
      <h2>子组件number2{{number2}}</h2>
      <input type="text" :value="dnumber2" @input="num2input">
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    // 子组件
    const cpn = {
      template: "#cpn",
      data() {
        return {
          dnumber1: this.number1,
          dnumber2: this.number2
        }
      },
      props: {
        number1: [Number, String],
        number2: [Number, String],
      },
      methods: {
        num1input(event) {
          // 当 input 里的值改变时，触发函数，并把 input 里的值赋值给 dnumber1
          this.dnumber1 = event.target.value
          // 自定义事件，将 dnumber1 传出到父组件
          this.$emit('num1change', this.dnumber1)
        },
        num2input(event) {
          this.dnumber2 = event.target.value
          this.$emit('num2change', this.dnumber2)
        }
      },
    };

    const app = new Vue({
      el: "#app",
      data: {
        num1: 1,
        num2: 2,
      },
      methods: {
        // 这个值是子组件传来的值，赋值给 num1
        num1Change(value) {
          this.num1 = value
        },
        num2Change(value) {
          this.num1 = value
        }
      },
      // 子组件
      components: {
        cpn
      },
    })
  </script>
```

### 3.2.5 watch 在父子组件通信的使用

`watch` 用于监听某个属性的改变

```js
      watch: {
        dnumber1(newValue){
          this.dnumber1 = newValue * 100
          this.$emit('num1change',newValue)
        },
        dnumber2(newValue){
          this.dnumber1 = newValue * 100
          this.$emit('num2change',newValue)
        }
      },
```

### 3.2.6 父访问子 `$children` `$refs`

开发中一般用 `$refs` 取到子组件：

```html
  <!-- 父组件 -->
  <div id="app">

    <cpn></cpn>
    <cpn></cpn>
    <cpn ref="aaa"></cpn>
    <button @click="btnClick" >按钮</button>

  </div>

  <!-- 子组件 -->
  <template id="cpn">

    <div>
      我是子组件
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    // 父传子：props
    const cpn = {
      template: "#cpn",
      data() {
        return {
          name:"我是子组件的name"
        }
      },
      methods: {
        showMessage(){
          console.log("showMessage");
        }
      },
    };
    const app = new Vue({
      el: "#app",
      data: {
        message:"hello"
      },
      methods: {
        btnClick(){
          // 1.$ children
          console.log(this.$children);
          console.log(this.$children[0].showMessage)

          for(c of this.$children){
            console.log(c);
          }
          // 2.$ref
          console.log(this.$refs.aaa.name)

        }
      },
      components: {
        cpn
      },
    })
  </script>
```

> 注意 `$refs` 的内容；
>
> `$children` 用于获取所有的组件；

![](../../.vuepress/public/images/lv29.jpg)

### 3.2.7 子访问父 `$parent` `$root`

在开发里用得比较少，而且不建议这样用。

![](../../.vuepress/public/images/lv30.jpg)



## 3.3 组件化高级



### 3.3.1 slot 插槽的基本使用

```html
  <!-- 父组件 -->
  <div id="app">

    <cpn></cpn>
    <cpn>
      <!-- 这段代码取代了 slot 的内容 -->
      <span style="color:red;">这是插槽内容222</span>
    </cpn>
    <cpn>
      <i style="color:red;">这是插槽内容333</i>
    </cpn>
    <cpn></cpn>

  </div>

  <!-- 插槽的基本使用使用<slot></slot> -->
  <!-- 子组件 -->
  <template id="cpn">

    <div>
      <div>
        {{message}}
      </div>
      <!-- 插槽默认值 -->
      <slot><button>button</button></slot>
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    const cpn = {
      template: "#cpn",
      data() {
        return {
          message: "我是子组件"
        }
      },
    }
    const app = new Vue({
      el: "#app",
      data() {
        return {
          message: "我是父组件消息"
        }
      },
      components: {
        cpn
      },
    })
  </script>
```

![](../../.vuepress/public/images/lv31.jpg)

> 抽取共性，不同的地方用插槽实现；



### 3.3.2 slot 具名插槽的使用

```html
  <!-- 父组件 -->
  <div id="app">

    <cpn>
      <span>没具名</span>
      <span slot="left">这是左边具名插槽</span>
      <!-- 新语法 -->
      <template v-slot:center>这是中间具名插槽</template>
      <!-- 新语法缩写 -->
      <template #right>这是右边具名插槽</template>


    </cpn>


  </div>

  <!-- 插槽的基本使用使用<slot></slot> -->
  <!-- 子组件 -->
  <template id="cpn">

    <div>

      <slot name="left">左边</slot>
      <slot name="center">中间</slot>
      <slot name="right">右边</slot>
      <slot>没有具名的插槽</slot>
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    const cpn = {
      template: "#cpn",
      data() {
        return {
          message: "我是子组件"
        }
      },
    }
    const app = new Vue({
      el: "#app",
      data() {
        return {
          message: "我是父组件消息"
        }
      },
      components: {
        cpn
      },
    })
  </script>
```

![](../../.vuepress/public/images/lv32.jpg)

### 3.3.3 编译作用域

```html
  <!-- 父组件 -->
  <div id="app">
    <!-- 使用的vue实例作用域的isShow -->
    <cpn v-show="isShow"></cpn>
  </div>
<!-- 插槽的基本使用使用<slot></slot> -->
  <!-- 子组件 -->
  <template id="cpn">
    <div>
      <h2>我是子组件</h2>
      <p>哈哈哈</p>
      <!-- 组件作用域，使用的子组件的作用域 -->
      <button v-show="isShow"></button>
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    const cpn = {
      template: "#cpn",
      data() {
        return {
          isShwo:false
        }
      },
    }
    const app = new Vue({
      el: "#app",
      data() {
        return {
          message: "我是父组件消息",
          isShow:true
        }
      },
      components: {
        cpn
      },
    })
  </script>
```

> 注意 Vue 实例里和组件里的 isShow；
>
> 在挂载 id 为 app 的 div 里的所有数据，不管是不是在组件标签里，都会去挂载它的 Vue 实例里找数据；
>
> 在 template 里，会去组件里查找数据；

### 3.3.4 作用域插槽的使用

```html
  <!-- 父组件 -->
  <div id="app">
    <cpn></cpn>
    <!-- 目的是获取子组件数据 -->
    <cpn>
      <!-- 2.5以下必须使用template -->
      <template slot-scope="slot">
        <!-- <span v-for="(item, index) in slot.data" :key="index">{{item}}-</span> -->
        <span>{{slot.data.join(' - ')}}</span>
      </template>
    </cpn>
    <cpn>
      <!-- 推荐使用 v-slot -->
        <!-- 2.5以下必须使用template -->
        <template v-slot="slot">
          <!-- <span v-for="(item, index) in slot.data" :key="index">{{item}}*</span> -->
          <span>{{slot.data.join(' * ')}}</span>
        </template>
    </cpn>
  </div>

<!-- 插槽的基本使用使用<slot></slot> -->
  <!-- 子组件 -->
  <template id="cpn">

    <div>
      <slot :data="pLanguage">
          <ul>
              <li v-for="(item, index) in pLanguage" :key="index">{{item}}</li>
            </ul>
      </slot>

    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    const cpn = {
      template: "#cpn",
      data() {
        return {
          isShwo:false,
          pLanguage:['JavaScript','Java','C++','C']
        }
      },
    }
    const app = new Vue({
      el: "#app",
      data() {
        return {
          isShow:true
        }
      },
      components: {
        cpn
      },
    })
  </script>
```

> 使用 v-slot 跨作用域的限制，取得数据；

### 3.3.5 动态组件

#### 1. 动态绑定已注册组件的名字

通过使用保留的 `<component>` 元素，动态地绑定到它的 `is` 特性，我们让多个组件可以使用同一个挂载点，并动态切换。

```html
    <script src="../../vue.js"></script>
    <div id="example">
        <button @click="change">切换页面</button>
        <component :is="currentView"></component>
    </div>
    <script>
        const home = {
            template: '<div>我是主页</div>'
        };
        const detail = {
            template: '<div>我是详情页</div>'
        };
        const archive = {
            template: '<div>我是存档页</div>'
        };
        new Vue({
            el: '#example',
            components: {
                home,
                detail,
                archive,
            },
            data: {
                index: 0,
                arr: ['home', 'detail', 'archive'],
            },
            computed: {
                currentView() {
                    return this.arr[this.index];
                }
            },
            methods: {
                change() {
                    this.index = (++this.index) % 3;
                }
            }
        })
    </script>
```

> 改变挂载的组件，只需要用动态绑定 `component` 标签里中 `is` 指令的值即可；

![](../../.vuepress/public/images/lv-10.gif)

#### 2. **直接绑定到组件对象上**

```html
        arr: [{
          template: `<div>我是主页</div>`
        }, {
          template: `<div>我是详情页</div>`
        }, {
          template: `<div>我是存档页</div>`
        }],
```

> 修改 data 里的 arr 即可；

#### 3. keep-alive 缓存

前面被切换的组件，实际上是直接被移除了。

如果需要子组件切换后，依然保留在内存中，保留它的状态或避免下次出现的时候重新渲染。那么就应该使用`<keep-alive>` 包裹组件。

```html
 <div id="example">
    <button @click="change">切换页面</button>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
```



# 4. Vue 的生命周期

[详解 Vue 生命周期实现](https://juejin.cn/post/6844903780736040973)

* `beforeCreate`
* `created`
* `beforeMount`
* `mounted`
* `beforeUpdate`
* `updated`
* `activated`
* `deactivated`
* `beforeDestroy`
* `destroyed`
* `errorCaptured`

![](../../.vuepress/public/images/lv34.png)

[Vue的钩子函数[路由导航守卫、keep-alive、生命周期钩子]](https://juejin.cn/post/6844903641866829838#heading-11)

[Vue官网动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)

[Vue动态组件 & keep-alive](https://juejin.cn/post/6844904185423462408)

Vue 提供了一个内置组件 `keep-alive` 来**缓存组件内部状态，避免重新渲染**

在被 `keep-alive` 包含的组件/路由中，会多出两个生命周期的钩子: `activated` 与 `deactivated`。

`activated` 在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用。

`deactivated`：组件被停用(离开路由)时调用。

> 开发Vue项目的时候，大部分组件是没必要多次渲染的



# 5. 脚手架 Vue-cli 和 webpack 的使用



# 6. Vue-router



## 6.1 路由简介

**什么是路由？**

路由就是通过互联的网络把信息从源地址传送到目的地的活动

路由提供了两种机制：路由和传送

* 路由是决定数据包从来源到目的地的路径
* 转送就是将数据转移

路由表

* 路由表本质就是一个映射表，决定了数据包的指向

## 6.2 前端/后端路由

**前端渲染、后端渲染概念**

* 后端渲染（服务端渲染）
  * jsp 技术
    * 后端路由，后端处理 URL 和页面映射关系，例如 springmvc 中的 @requestMapping 注解配置的URL 地址，映射前端页面
* 前后端分离（ajax请求数据）
  * 后端只负责提供数据，ajax发送网络请求后端服务器，服务器回传数据，js代码渲染dom
  * 静态资源服务器（html+css+js）
* 单页面富应用（SPA页面）
  * 前后端分离加上前端路由，前端路由的url映射表不会向服务器请求，是单独url的的页面自己的ajax请求后端，后端只提供api负责响应数据请求。**改变url，页面不进行整体的刷新**
  * 整个网站只有一个html页面
  * SPA 最主要的特点就是在前后端分离的基础上加了一层前端路由

> 开发的发展进程

## 6.3 **URL 的 hash 和 HTML5 的 history**

* URL 的 hash 是通过锚点(#)，其本质上改变的是 window.location 的 href 属性。
* 可以通过直接赋值 location.hash 来改变 href，但是页面并不会发生刷新。

![](../../.vuepress/public/images/lv35.png)

> 通过改变 hash 改变 url，此时页面是未刷新的。
>
> vue-router其实用的就是这样的机制，改变url地址，这个url地址存在一份路由映射表里面，比如`/user`代表要请求用户页面，只要配置了这个路由表（路由关系），就可以前端跳转而不刷新页面，所有的数据请求都走 ajax。

同样的使用 HTML5 的 history 模式也是不会刷新页面的，history 对象是栈结构，先进后出，pushState 类似压入栈中，back 是回退。

> replaceState 模式与 pushState 模式区别在于 replaceState 模式浏览器没有返回只是替换，不是压入栈中。
>
> go 只能在 pushState 模式中使用，go 是前进后退到哪个历史页面。

## 6.4 **vue-router 的安装配置**

安装：

```bash
npm install vue-router --save
```

> 在模块化工程中使用他(因为是一个插件，所以可以通过 `Vue.use` 来安装路由功能)

* 在 src 下创建一个 router 文件夹（一般安装 `vue-router` 时候会自动创建）用来存放 `vue-router` 的路由信息导入路由对象，并且调用 `Vue.use(VueRouter)`

* 创建路由实例，并且传入路由**映射配置**

* 在 Vue 实例中挂载创建的 **路由实例对象**

> *router文件夹中的 index.js*

```js
/**
 * 配置路由相关信息
 * 1.先导入vue实例和vue-router实例
 */
/**
 * 配置路由相关信息
 * 1.先导入vue实例和vue-router实例
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

//2. 通过Vue.use(插件)，安装插件
Vue.use(Router)
//3. 创建 router路由对象
const routes = [
  //配置路由和组件之间的对应关系
  {
    path: '/',//url
    name: 'HelloWorld',
    component: HelloWorld //组件名
  }
]
const router = new Router({
  //配置路由和组件之间的应用关系
  routes
})
//4.导出router实例
export default router
```

> *main.js中挂载 router对象*

```js
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//使用路由对象，简写对象增强写法
  render: h => h(App)
})
```

## 6.5 vue-router 的使用

创建路由组件

> *在 components 文件夹下创建 2 个组件。*

> *Home 组件*

```vue
<template>
  <div class="page-contianer">
    <h2>这是首页</h2>
    <p>我是首页的内容,123456.</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'Home'
}
</script>
<style scoped>
</style>
```

> *About 组件*

```vue
<template>
  <div class="page-contianer">
    <h2>这是关于页面</h2>
    <p>我是关于页面的内容，about。</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'About'
}
</script>
<style scoped>
</style>
```

配置路由映射：**组件和路径映射关系**

> 修改 router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

// 2. 通过Vue.use(插件)，安装插件
Vue.use(Router)
//3. 创建 router路由对象
const routes = [
  //配置路由和组件之间的对应关系
  {
    path: '/home',//home  前端路由地址
    name: 'Home',
    component: Home //组件名
  },
  {
    path: '/about',//about 前端路由地址
    name: 'About',
    component: () => import('@/components/About') //懒加载组件
  }
]
const router = new Router({
  //配置路由和组件之间的应用关系
  routes
})
//4.导出router实例
export default router
```

**使用路由：通过`<router-link>`和`<router-view>`**

在 App.vue 中使用`<router-link>`和`<router-view>` 两个全局组件显示路由。

* `<router-link>`是全局组件，最终被渲染成 a 标签，但是`<router-link>`只是标记路由指向类似一个 a 标签或者按钮一样，如果我们点击 a 标签要跳转页面或者要显示页面，所以就要用上`<router-view>`。
* *`<router-view>`* 是用来占位的，就是路由对应的组件展示的地方，该标签会根据当前的路径，动态渲染出不同的组件。
* 路由切换的时候切换的是`<router-view>`挂载的组件，其他不会发生改变。
* `<router-view>`默认使用 hash 模式，可以在 index.js中配置修改为 history 模式。

在 App.vue 修改 template

```vue
<template>
  <div id="app">
    <router-link to="/home">首页</router-link> |
    <router-link to="/about">关于</router-link>
    <router-view/>
  </div>
</template>
```

> 此时未配置路由的默认值，所以第一次进入网页的时候`<router-view>`占位的地方是没有内容的。

**路由的默认值和history模式**

> 路由的默认值，修改 index.js 的 routes 

```js
const routes = [
  {
    path: '',
    redirect: '/home'//缺省时候重定向到/home
  },
  //配置路由和组件之间的对应关系
  {
    path: '/home',//home  前端路由地址
    name: 'Home',
    component: Home //组件名
  },
  {
    path: '/about',//about 前端路由地址
    name: 'About',
    component: () => import('@/components/About') //懒加载组件
  }
]
```

> 添加缺省值，并重定向到`/home`路径，此时打开 http://localhost:8080 ，直接显示 home 组件内容。

路由默认为 hash 模式，可以更改为 history

```js
const router = new Router({
  //配置路由和组件之间的应用关系
  routes,
  mode: 'history'//修改模式为history
})
```

> 此时发现浏览器地址栏的 URL 是没有 `#` 的。

**`<router-link>`的其他属性**

* `to`属性：用于跳转到指定路径。

* `tag`属性：可以指定`<router-link>`之后渲染成什么组件使用`<router-link to='/home' tag='button'>`会被渲染成一个按钮，而不是 a 标签。

* `replace`属性：在 history 模式下指定`<router-link to='/home' tag='button' replace>`使用`replaceState` 而不是 `pushState` ，此时浏览器的返回按钮是不能使用的。

* `active-class`属性：当`<router-link>`对应的路由匹配成功的时候，会自动给当前元素设置一个`router-link-active`的 class，设置 active-class 可以修改默认的名称。

  * 在进行高亮显示的导航菜单或者底部tabbar时，会用到该属性

  * 但是通常不会修改类的属性，会直接使用默认的`router-link-active`

  *  `<router-link to='/home' tag='button' active-class='active'>`此时被选中的`<router-link>`就会有 active 的 class。

  *  如果每个`<router-link>`都要加上`active-class='active'`，那就在路由里面统一更改。

    ```js
       const router = new Router({
         //配置路由和组件之间的应用关系
         routes,
         mode: 'history',//修改模式为history
         linkActiveClass: 'active'
       })
    ```

```vue
   <template>
     <div id="app">
       <router-link to="/home" tag='button' replace active-class='active'>首页</router-link> |
       <router-link to="/about" active-class='active'>关于</router-link>
       <router-view/>
     </div>
   </template>

   <script>
   export default {
     name: 'App'
   }
   </script>

   <style>
   #app {
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     margin-top: 60px;
   }
   .active {
     color: red;
   }
   </style>
```

> 修改 app.vue 文件此时被选中的 `<router-link>` 就有了 active 属性，给 active 的 class 加上字体变红的css。

**通过代码修改路由跳转**

> *$router 属性*

```vue
<template>
  <div id="app">
    <!-- <router-link to="/home" tag='button' replace active-class='active'>首页</router-link> |
    <router-link to="/about" active-class='active'>关于</router-link> -->
    <button @click="homeClick">首页</button>|
    <button @click="aboutClick">关于</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    homeClick() {//通过代码的路径修改路由
      this.$router.push('/home')//push 等价于pushState
      // this.$router.replace('/home')//replace 等价于replaceState
      console.log("homeClick")
    },
    aboutClick() {
      this.$router.push('/about')
      // this.$router.replace('/about')//replace 等价于replaceState
      console.log("aboutClick")
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.active {
  color: red;
}
</style>
```

> 修改 app.vue，将`<router-link>`换成`button`等任何组件，添加上点击事件，并写好点击事件响应方法，此时使用`this.$router.push('/home')`，push 方法等价于 pushState 方法，replace 方法等replaceState方法。 

## 6.6 **渐入vue-router**

### 6.6.1 动态路由

一个页面的 path 路径可能是不确定的，例如可能有 `/user/aaaa` 或者 `/user/bbbb`，除了 `/user` 之外，后面还跟上了用户 ID `/user/123`等。这种 path 和 component 的匹配关系，叫动态路由。



*新建一个 User 组件*

```vue
<template>
  <div class="page-contianer">
    <h2>这是用户界面</h2>
    <p>这里是用户页面的内容。</p>
    <p>用户ID是: {{ userId }}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'User',
  computed:{
    userId() {
      // route 是处于活跃状态的路由，router 是路由对象
      return this.$route.params.userId
    }
  }
}
</script>
<style scoped>
</style>
```

> 该组件定义一个计算属性，通过`this.$route.params.userId`获取处于激活状态的路由参数`userId`。



*配置路由参数 index.js*

```js
  {
    // 表示匹配/user/动态路由参数userId
    path: '/user/:userId',
    name: 'User',
    component: () => import('@/components/User') //懒加载组件
  }
```

> 使用`:userId`指定动态路由参数`userId`。

*app.vue 中添加 user 页面的**`<router-link>`**，并添加 userId 变量*

```vue
<router-link :to="'/user/'+userId">用户</router-link>
```

```js
  data (){
    return {
      userId: 'zhangsan'
    }
```

`$route`是代表处于激活状态的路由，这里指的也就是

```js
  {
    path: '/user/:userId',
    name: 'User',
    component: () => import('@/components/User')
  }
```

### 6.6.2 路由的懒加载

*问题：打包时候 js 太大，页面响应缓慢*

如果组件模块化了，当路由被访问的时候才开始加载被选中的组件，这样就是懒加载，前面也介绍过。

```js
component: () => import('@/components/User')
```

> 此时因为是懒加载，需要用到这个组件的时候才会加载，所以不会一次性请求所有js。
>
> 这样会使一个路由被打包成一个 js 文件；对用户体验更好，最好都使用路由懒加载的方式；



### 6.6.3 **认识嵌套路由**

嵌套路由是一个常见的功能

* 创建对应的子组件，并且在路由映射(`router/index.js`)中配置对应的子路由。
* 在组件内部使用`<router-view>`标签来占位。



*新建 2 个子组件 HomeNews 和 HomeMessage*

```vue
<template>
  <div class="page-contianer">
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item + index + 1 }}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'HomeNews',
  data() {
    return {
      list: ['新闻', '新闻', '新闻', '新闻']
    }
  }
}
</script>
<style scoped></style>
```

```vue
<template>
  <div class="page-contianer">
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item + index + 1 }}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'HomeMessage',
  data() {
    return {
      list: ['消息', '消息', '消息', '消息']
    }
  }
}
</script>
<style scoped></style>
```

*配置嵌套路由*

```js
  {
    path: '/home',//home  前端路由地址
    name: 'Home',
    component: Home, //组件名
    children: [
      {
        path: '',
        redirect: '/home/news'//缺省时候重定向到/home/news
      },
      {
        path: 'news',//子嵌套路由 无须加/
        name: 'News',
        component: () => import('@/components/HomeNews') //懒加载组件
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/components/HomeMessage') //懒加载组件
      }
    ]
  },
```

*修改 Home.vue 组件加上`<router-link>`和 `<router-view/>`*

```vue
<template>
  <div class="page-contianer">
    <h2>这是首页</h2>
    <p>我是首页的内容,123456.</p>
    <router-link to="/home/news">新闻</router-link>|
    <router-link to="/home/message">消息</router-link>
    <router-view/>
  </div>
</template>
```

### 6.6.4 vue-router 的参数传递

之前的动态路由说的`userId`也是参数传递的方式的一种。

传递参数主要有两种类型：params 和 query

* params 类型：
  * 配置路由格式：`/router/:id`
  * 传递的方式：在 path 后面跟上对应的值
  * 传递后形成的路径：`/router/123` `/router/abc`
* query 类型：
  * 配置路由格式：`/router` 也就是普通配置
  * 传递的方式：对象中使用 query 的 key 作为传递方式
  * 传递后形成的路径：`/router?id=123` `/router?id=abc`



*新建一个 Profile.vue 组件，并配置路由映射，添加指定的`<router-link>`。*

```vue
<template>
  <div class="page-contianer">
    <h2>这是档案界面</h2>
    <p>这里是档案页面的内容。</p>
    <p>档案的名字是: {{ profileInfo.name }}</p>
    <p>档案的年龄是: {{ profileInfo.age }}</p>
    <p>档案的身高是: {{ profileInfo.height }}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'Profile',
  computed: {
    profileInfo() {
      return this.$route.query.profileInfo
    }
  }
}
</script>
<style scoped></style>
```

```js
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/components/Profile')
  }
```

```vue
<router-link :to="{ path: '/profile', query: { profileInfo } }">档案</router-link>
```

在 App.vue 中设置初始的对象`profileInfo`

```js
  data (){
    return {
      userId: 'zty',
      profileInfo: {
        name: "zty",
        age: 24,
        height: 177
      }
    }
  }
```

使用代码编写传递数据，使用`button`代替`<router-link>`，并添加点击事件。

```vue
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>
```

```js
    userClick() {
      this.$router.push('/user/' + this.userId)
      console.log("userClick")
    },
    profileClick() {
      let profileInfo = this.profileInfo
      this.$router.push({
        path: '/profile',
        query: {
          profileInfo
        }
      })
      console.log("profileClick")
    }
```

### 6.6.5 **router 和 route 的由来**

vue 全局对象 `this.$router ` 与 main.js 导入的 router 对象是一个对象，也就是我们 `router/index.js` 导出的对象 router 。

`this.$route` 对象是当前处于活跃的路由，有 params 和 query 属性可以用来传递参数。

`$router` 和 `$route` 是继承自 vue 的原型，他们都在 vue 的原型链上。

> 所有的组件都继承自 vue 的原型

## 6.7 导航守卫

监听路由跳转的转换

实现路由跳转时更改 title



修改`router/index.js`

```js
/**
 * 前置钩子：从 from 跳转到 to
 * from 来的路由
 * to 要去的路由
 */
router.beforeEach((to, from, next) => {
  // meta.title是 to 路由里的属性
  // matched[0] 为了解决嵌套路由的问题不然首页会显示 undefined
  document.title = to.matched[0].meta.title //给目标路由的页面的title赋值
  next()//必须调用，不调用不会跳转
})
```

> *router.beforeEach()称为前置钩子(前置守卫)，顾名思义，跳转之前做一些处理。*

```js
  //配置路由和组件之间的对应关系
  {
    path: '/home',//home  前端路由地址
    name: 'Home',
    component: Home, //组件名
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        redirect: '/home/news'//缺省时候重定向到/home/news
      },
      {
        path: 'news',//子嵌套路由 无须加/
        name: 'News',
        component: () => import('@/components/HomeNews') //懒加载组件
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/components/HomeMessage') //懒加载组件
      }
    ]
  },
```

前面说了前置守卫 `router.beforeEach()`，相对的应该也存在后置守卫(后置钩子)。

```js
/**
 * 后置钩子
 */
router.afterEach((to, from) => {
  console.log('后置钩子调用了----')
})
```

> 顾名思义，也就是在跳转之后的回调函数。

* 前置守卫和后置守卫都是**全局守卫**。
* 还有[路由独享守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB)和[组件内的守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB)

*路由独享守卫，路由私有的*：

```js
  {
    path: '/about',//about 前端路由地址
    name: 'About',
    component: () => import('@/components/About'),
    beforeEnter: (to, from, next) => {
      console.log('来自' + from.path + ',要去' + to.path)
      next()
    },
    meta: {
      title: '关于'
    }
  },
```

>  `beforeEnter`的参数与全局守卫一样，修改`about`路由的参数，添加路由独享守卫，此时只有跳转到`about`路由，才会打印日志。

组件内的守卫，直接在组件中定义的属性

\- `beforeRouteEnter`

\- `beforeRouteUpdate` (2.2 新增)

\- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫不能访问 `this`，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。不过，你可以通过传一个回调给 `next` 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

**完整的导航解析流程**

1. 导航被触发。

2. 在失活的组件里调用离开守卫。

3. 调用全局的 `beforeEach` 守卫。

4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。

5. 在路由配置里调用 `beforeEnter`。

6. 解析异步路由组件。

7. 在被激活的组件里调用 `beforeRouteEnter`。

8. 调用全局的 `beforeResolve` 守卫 (2.5+)。

9. 导航被确认。

10. 调用全局的 `afterEach` 钩子。

11. 触发 DOM 更新。

12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

## 6.8 **keep-alive**

*  `keep-alive` 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或者避免重新渲染。
*  `router-view` 也是一个组件，如果用`<keep-alive><router-vie/></keep-alive>`，将其包起来，所有路径匹配到的视图组件都会被缓存。





