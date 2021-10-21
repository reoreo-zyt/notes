// JavaScript 中数组 sort() 方法的基本使用
// https://juejin.cn/post/6971367726401093668

// 接收一个可选的排序回调函数，有两个个用于比较的参数；
// 省略函数，则使用字符串的 unicode 排序；
// 首先，将数组里的数字逐个转换为字符串，得到 ['49', '5', '14', '89', '71', '3', '10']
// 再按照首位的字符的 Unicode 位点来算：

let arr = [49, 5, 14, 89, 71, 3, 10];
arr.sort();

console.log(arr);// [10,14,3,49,5,71,89]

// 复原
arr = [49, 5, 14, 89, 71, 3, 10];
// 升序
console.log(arr.sort((a, b) => a - b));
// 复原
arr = [49, 5, 14, 89, 71, 3, 10];
// 降序
console.log(arr.sort((a,b) => b-a));

// 排序对象数组
let items = [
    {name: 'Edward', value: 21},
    {name: 'Sharpe', value: 37},
    {name: 'And', value: 45},
    {name: 'The', value: -12},
    {name: 'Magnetic'},
    {name: 'Zeros', value: 37}
];

// 根据 value 升序
console.log(items.sort((a,b) => a.value - b.value));

// 复原
items = [
    {name: 'Edward', value: 21},
    {name: 'Sharpe', value: 37},
    {name: 'And', value: 45},
    {name: 'The', value: -12},
    {name: 'Magnetic'},
    {name: 'Zeros', value: 37}
];

// 根据 value 降序
console.log(items.sort((a,b) => b.value - a.value));

