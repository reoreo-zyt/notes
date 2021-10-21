var obj = {a:1, b:2, c:3};
let nums = [1,2,3]

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

function a(a,b) {
  return arguments;
}

for (let value of a(1,2)) {
  console.log(value);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"