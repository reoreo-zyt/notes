import defineReactiveData from './reactive';
// 观察data对象和数组 
// {}
// []
function Observer(data) {
    // 如果data里的数据是数组
    if (Array.isArray(data)) {

    } else {
        // 如果data里的数据是对象
        this.walk(data);
    }
}

Observer.prototype.walk = function (data) {
    // 获取data对象的每一个数据
    var keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i],
            value = data[key];

        defineReactiveData(data, key, value);
    }

}

export default Observer;