// 查找数组是否包含某个元素 返回布尔

// 参数：

// searchElement(必须):被查找的元素

// fromIndex(可选):
// 默认值为0，参数表示搜索的起始位置，接受负值。
// 正值超过数组长度，数组不会被搜索，返回false。
// 负值绝对值超过长数组度，重置从0开始搜索。

let a=['OB','Koro1',1,NaN];
// let b=a.includes(NaN); // true 识别NaN
// let b=a.includes('Koro1',100); // false 超过数组长度 不搜索
// let b=a.includes('Koro1',-3);  // true 从倒数第三个元素开始搜索 
// let b=a.includes('Koro1',-100);  // true 负值绝对值超过数组长度，搜索整个数组

// indexOf方法不能识别NaN
// indexOf方法检查是否包含某个值不够语义化，需要判断是否不等于-1