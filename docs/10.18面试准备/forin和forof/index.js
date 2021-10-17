var obj = {a:1, b:2, c:3};
let nums = [1,2,3]

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

for (let value of nums) {
  console.log(value);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"