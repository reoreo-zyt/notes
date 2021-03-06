// 浅拷贝（会共用引用类型的值）
// 返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象，且原数组不会被修改。
// 参数:

// begin(可选): 索引数值,接受负值，从该索引处开始提取原数组中的元素,默认值为0。

// end(可选):索引数值(不包括),接受负值，在该索引处前结束提取原数组元素，默认值为数组末尾(包括最后一个元素)。

let a = ['hello', 'world'];
let b = a.slice(0, 1); // ['hello']
a[0] = '改变原数组';
console.log(a, b); // ['改变原数组','world'] ['hello']
b[0] = '改变拷贝的数组';
console.log(a, b); // ['改变原数组','world'] ['改变拷贝的数组']
