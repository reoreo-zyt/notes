async function async1(){
    await async2()
    console.log('async1 end')
}

async function async2(){
    console.log('async2 end')
}

async1()

setTimeout(function() {
   console.log('setTimeout') 
},0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})
// 浏览器环境与node环境一致（旧版本有async不一致的情况，原因是node实现的v8引擎不是最新的规范） 
// 旧版输出如下，新版有改动
// script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout

// 浏览器环境下
// async2 end
// Promise
// async1 end
// promise1
// promise2
// setTimeout

// node15环境下
// async2 end
// Promise
// async1 end
// promise1
// promise2
// setTimeout