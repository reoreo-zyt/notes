// 数组转字符串
// 把数组中的所有元素通过指定的分隔符进行分隔放入一个字符串，返回生成的字符串。
// 参数:

// str(可选): 指定要使用的分隔符，默认使用逗号作为分隔符。

let a= ['hello','world'];
let str=a.join(); // 'hello,world'
let str2=a.join('+'); // 'hello+world'
console.log(str);
console.log(str2);