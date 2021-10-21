// 查找字符串首次出现的位置,如果找到返回该字符串的下标值，找不到返回 -1
// 第二个参数表示从哪个位置开始
var str = 'hello 秦司令';
console.log(str.indexOf('秦')) // 6 
console.log(str.indexOf('a')) // -1
console.log(str.indexOf('秦', 7)) // -1

