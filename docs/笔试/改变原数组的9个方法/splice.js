// 可以理解为删除的api
// 三个参数：start deleteCount（可选） items（可选）

let a = [1, 2, 3, 4, 5, 6];

// deleteCount为 0 表示删除 0 个，即插入；
// 从位置 0 开始，删除 0 个，插入 0,0,0
let aTemp = a.splice(0,0,0,0,0);

console.log(aTemp);// [] 没有删除元素，就会返回空数组
console.log(a);// [0,0,0,1,2,3,4,5,6]

// 从位置 3 开始，删除 1 个；
let myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
let removed = myFish.splice(3, 1);

console.log(removed);// [ 'mandarin' ]
console.log(myFish);// [ 'angel', 'clown', 'drum', 'sturgeon' ]

// 从位置 2 开始，删除一个，并插入；
let myFish2 = ['angel', 'clown', 'drum', 'sturgeon'];
let removed2 = myFish2.splice(2, 1, 'trumpet');

console.log(removed2);// [ 'drum' ]
console.log(myFish2);// [ 'angel', 'clown', 'trumpet', 'sturgeon' ]

// 从 -2 的位置删除 1 个；-1 表示数组末尾；
let myFish3 = ['angel', 'clown', 'mandarin', 'sturgeon'];
let removed3 = myFish3.splice(-2, 1);

console.log(removed3);// [ 'mandarin' ]
console.log(myFish3);// [ 'angel', 'clown', 'sturgeon' ]

// 如果只有一个参数start，表示从那个位置开始删除所有；