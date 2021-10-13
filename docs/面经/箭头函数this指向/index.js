function F() {
    this.name = "111"
    F.call(obj)
}
var obj = {name: "222"}
// TODO: 
var a = new F()//报错 Maximum call stack size exceeded