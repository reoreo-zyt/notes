[一看就懂的var、let、const三者区别](https://juejin.cn/post/6925641096152399880)

[为什么let和const不能重复声明？为什么let和const存在暂时性死区？](https://juejin.cn/post/6985343051363745828)

var，let，const的区别是什么？

* var存在变量提升，而let和const不存在变量提升
* var声明的变量会添加进window对象中，而let和const声明的变量不会
* let和const声明的变量不可以重复声明
* let和const声明的变量存在暂时性死区
* const声明的基础类型不可修改，const声明的引用类型只能修改该引用类型的属性而不能给该变量重新赋值（const确定了一个地址，该地址不能被修改）
* let和const存在块级作用域，而var不存在
* let在for循环中每循环一次就会重新声明一次（因为let有块级作用域）

