// 支持负数，不改变原字符串
var str = 'hello 秦司令秦';
console.log(str.substr(1))  // ello 秦司令秦
console.log(str.substr(1,2)) // el
console.log(str.substr(-4,4)) // 秦司令秦
console.log(str)  //不会改变原字符串
