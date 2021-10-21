// 用于合并两个或多个数组，返回一个新数组

let a = [1, 2, 3];
let b = [4, 5, 6];
//连接两个数组
let newVal = a.concat(b); // [1,2,3,4,5,6]
console.log(newVal);
// 连接三个数组
let c = [7, 8, 9]
let newVal2 = a.concat(b, c); // [1,2,3,4,5,6,7,8,9]
console.log(newVal2);
// 添加元素
let newVal3 = a.concat('添加元素', b, c, '再加一个');
console.log(newVal3);
// [1,2,3,"添加元素",4,5,6,7,8,9,"再加一个"]
// 合并嵌套数组  会浅拷贝嵌套数组
let d = [1, 2];
let f = [3, [4]];
let newVal4 = d.concat(f); // [1,2,3,[4]]
console.log(newVal4);