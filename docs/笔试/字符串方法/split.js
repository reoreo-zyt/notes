// split 按照格式转成数组，不改变原字符串
var str = 'hello秦司令秦';
var str1 = 'hello 秦司令';
console.log(str.split(''))  //["h", "e", "l", "l", "o", "秦", "司", "令", "秦"]
console.log(str1.split(' ')) //["hello", "秦司令"]
console.log(str1,str) //未发生改变
