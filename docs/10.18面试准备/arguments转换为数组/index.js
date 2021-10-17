//arguments对象的转换
function foo(a, b) {
    // 把this指向arguments
    console.log(...arguments);
    return Array.prototype.slice.call(arguments);
}
console.log(foo(1, 2)); // [1,2]