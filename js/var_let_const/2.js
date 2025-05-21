// 1.同步任务，放入执行栈，宏任务队列（同步任务就是第一个宏任务）
console.log('1');
// 2.setTimeout()函数，异步任务，进入event queue 宏任务队列
setTimeout(function() {
    // 同步执行
    console.log('2');
    // 异步执行，分发到微任务队列
    process.nextTick(function() {
        console.log('3');
    })
    // 构造函数立即执行
    new Promise(function(resolve) {
        console.log('4'); // 同步执行
        resolve();     // 改变状态，触发.then()中的回调
    }).then(function() {
        console.log('5') //异步执行，分发到微任务队列
    })
})
// 3.process.nextTick()函数，异步任务，进入event queue 微任务队列
process.nextTick(function() {
    console.log('6');
})
// 4. 因为 new Promise 的构造函数立即执行executor
new Promise(function(resolve) {
    console.log('7');  //同步执行
    resolve();   //改变状态，触发.then()中的回调
    //5. 异步任务，进入event queue 微任务队列
}).then(function() {
    console.log('8') //异步执行，分发到微任务队列
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

