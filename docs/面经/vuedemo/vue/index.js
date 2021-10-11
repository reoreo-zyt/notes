import { initState } from './init';

// Vue是一个构造函数
function Vue(options) {
    // 初始化数据
    this._init(options);
}

// 初始化传入的对象
Vue.prototype._init = function (options) {
    // this 指向 Vue
    var vm = this;
    // 将 options 挂载到实例上；
    vm.$options = options;

    // 初始化状态（比如data,watch）
    initState(vm);
}

export default Vue;