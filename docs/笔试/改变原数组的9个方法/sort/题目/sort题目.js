// 请封装 JavaScript 中的数组内置方法sort()，实现快速降序排序，如： var arr = [45, 32, ‘12’, 39, ‘59’];

let arr = [45, 32, '12', 39, '59'];

function mySort(arr) {
    if (!Array.isArray(arr)) {
        return '请输入参数数组';
    }
    // 转为数字
    arr = arr.map(item => Number(item));
    // 或者
    // arr = arr.map(item => +item);
    return arr.sort((a, b) => b - a);
}

console.log(mySort(arr));
