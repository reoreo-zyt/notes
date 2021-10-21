// 匹配字符串,查找到返回一个数组对象,数组对象里有 匹配的值 查找字符串的下标 和 原字符串内容,找不到返回null
var str = 'hello秦司令秦';		
console.log(str.match('秦'))  // ["秦", index: 5, input: "hello秦司令秦", groups: undefined]
console.log(str.match('1'))	 // null
