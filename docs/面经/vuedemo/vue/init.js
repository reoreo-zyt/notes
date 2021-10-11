import proxyData from "./proxy";

function initState(vm){
    var options = vm.$options;

    //如果data存在，初始化它
    if(options.data){
        initData(vm);
    }
}

function initData(vm){
    var data = vm.$options.data;
    // vm._data创建一个临时的data,不修改用户使用的data
    // call 函数返回data函数的对象表示
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

    // 遍历data，进行代理
    for(var key in data){
        proxyData(vm,'_data',key);
    }
}

export {
    initState,
}