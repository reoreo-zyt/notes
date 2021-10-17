console.log('in____');
console.log(instance in Object); // false
console.log(instance.property in Father); // false
console.log(instance in Son); // false