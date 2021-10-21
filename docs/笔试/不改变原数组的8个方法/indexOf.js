// 查找数组是否存在某个元素，返回下标
// 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

// 参数:

// searchElement(必须):被查找的元素

// fromIndex(可选):开始查找的位置(不能大于等于数组的长度，返回-1)，接受负值，默认值为0。

let a=['啦啦',2,4,24,NaN]
console.log(a.indexOf('啦'));  // -1 
console.log(a.indexOf('NaN'));  // -1 
console.log(a.indexOf('啦啦')); // 0
