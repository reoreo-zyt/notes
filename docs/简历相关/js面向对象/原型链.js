function Father(){
    this.property = true;
}
Father.prototype.getFatherValue = function(){
    return this.property;
}
function Son(){
    this.sonProperty = false;
}
//继承 Father
Son.prototype = new Father();//Son.prototype被重写,导致Son.prototype.constructor也一同被重写
Son.prototype.getSonVaule = function(){
    return this.sonProperty;
}
var instance = new Son();
console.log(instance.getFatherValue());//true 表明在原型链上

// 判断原型和实例的继承关系
console.log('instanceOf____');
console.log(instance instanceof Object);//true
console.log(instance instanceof Father);//true
console.log(instance instanceof Son);//true

console.log('isPrototypeOf____');
console.log(Object.prototype.isPrototypeOf(instance));//true
console.log(Father.prototype.isPrototypeOf(instance));//true
console.log(Son.prototype.isPrototypeOf(instance));//true
