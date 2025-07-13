function* generator(){
    console.log('enter a')
    let a  = yield 1;
    let b = yield(function (){
        console.log(a)
        return 2;
    })()
    console.log(b)
    return 3
}

const g = generator()
console.log(typeof g)
console.log(g.next()) // 执行到第一个yield
console.log(g.next()) // 执行到第二个yield
console.log(g.next()) // 执行完函数
console.log(g.next()) // 函数已经执行完了，所以返回undefined
