// function Person() {}
// Person.prototype.name = 'hanmeimei';
// Person.prototype.say = function() {
//   alert(this.name);
// }
// Person.prototype.friends = ['lilei'];

// var person1 = new Person();
// var person2 = new Person();
// person1.name = 'lilei';
// console.log(person2.name);
// person1.friends.push('xiaoming');
// console.log(person2.friends)  //['lilei', 'xiaoming']

function Person(name) {
    this.name = name
    this.friends = ['lilei']
}
Person.prototype.say = function () {
    console.log(this.name)
}

var person1 = new Person();
var person2 = new Person();
person1.friends.push('xiaoming');
console.log(person1.friends); // ['lilei','xiaoming']
console.log(person2.friends);  //['lilei']