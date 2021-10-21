## 常见笔试编程题

### 1. 牛客网前端挑战题

#### 1.1 dom节点查找（简单题）

* node.parentNode 取得父节点
* node.contains 包含节点（不管层级有多深）


查找两个节点的最近的一个共同父节点，可以包括节点自身：

解题思路：因为只是需要找到父元素，所以只需要固定一个DOM节点不动，另外一个节点不断向上找；直到遇到一个节点包含另一个节点；

递归查找：

```js
function commonParentNode(oNode1, oNode2) {
    let parent1 = oNode1.parentNode;
    let parent2 = oNode2.parentNode;
    if(parent1 === parent2) {
        return parent1;
    }else{
        return commonParentNode(parent1,parent2);
    }
}
```

迭代查找：

```js
function commonParentNode(oNode1, oNode2) {
    while(true){
        oNode1=oNode1.parentNode;
        if(oNode1.contains(oNode2)){
            return oNode1;
        }
    }
}
```

#### 1.2 根据包名，在指定空间中创建对象

输入描述:
namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
输出描述:
{a: {test: 1, b: {c: {d: {}}}}}

```js
function namespace(oNamespace, sPackage) {
    var package = sPackage.split('.');
    var obj = oNamespace;
    
    for (var i = 0; i < package.length; ++i) {
        if (typeof obj[package[i]] !== 'object') {
            obj[package[i]] = {};
        }
 
        obj = obj[package[i]];
    }
 
    return oNamespace;
}
```

#### 1.3 斐波那契数列

```js
function fibonacci(n) {
    if(n == 1 || n == 2){
       return 1; 
    }
    return arguments.callee(n-1) + arguments.callee(n-2);
}
```

> arguments.callee 用来指代当前函数，用于解耦；

#### 1.4 字符串字符统计

统计字符串中每个字符的出现频率，返回一个 Object，key 为统计字符，value 为出现频率

暴力解法：

```js
function count(str) {
    str = str.split(' ').join('');
    const length = str.length;
    let result = {};
    let nums = 0;
    for (let i = 0; i < length; i++) {
        let temp1 = str[i];
        for (let j = 0; j < length; j++) {
            let temp2 = str[j];
            if (temp1 == temp2) nums++;
        }
        result[temp1] = nums;
        nums = 0;
    }
    return result;
}

console.log(count('hello world'));// { h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }
```

#### 1.5 数组求和

```js
function sum(arr) {
    return arr.reduce((pre, cur) => pre + cur);
}
```

#### 1.6 删除最后一位的数组

删除后不改变原数组

```js
function truncate(arr) {
    return arr.slice(0,arr.length - 1);
}
```

> 注意splice会改变原数组


#### 1.7 添加元素到数组第一项

不改变原数组

```js
function prepend(arr, item) {
    let arrTemp = [];
    return arrTemp.concat(item, arr);
}
```

更简单地，有：

```js
function prepend(arr, item) {
    return [item].concat(arr);
}
```

#### 1.8 删除数组第一项

不改变原数组

```js
function curtail(arr) {
    return arr.slice(1,arr.length);
}
```

#### 1.9 合并数组

不改变原数组

```js
function concat(arr1, arr2) {
    return [...arr1,...arr2];
}
```

#### 1.10 计数

统计数组 arr 中值等于 item 的元素出现的次数

```js
function count(arr, item) {
    return arr.filter(value => value == item).length;
}
```

#### 1.11 求二次方

```js
// 描述
// 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
// 示例1
// 输入：
// [1, 2, 3, 4]

// 输出：
// [1, 4, 9, 16]
function square(arr) {
    return arr.map(v => v * v)
}
```

#### 1.12 返回数组下标索引

```js
function findAllOccurrences(arr, target) {
    let result = [];
    arr.forEach((value, index) => {
        if (value == target) {
            result.push(index);
        }
    })
    return result;
}

console.log(findAllOccurrences([1, 2, 3, 4], 4));
```

