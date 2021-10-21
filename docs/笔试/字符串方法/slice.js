// 跟substring方法几乎一样,只不过该方法也可以写负数,不会改变原字符串
var str = 'hello 秦司令秦';
console.log(str.slice(1))  // ello 秦司令秦
console.log(str.slice(1,3)) // el
console.log(str.slice(-4,-2)) // 秦司
console.log(str)  // 不会改变原字符串
