// 生成器函数
// async 更好理解
// 函数内部有异步任务，可以控制执行的流程
function * idGenerator(){
    let id = 1
    while(id < 4){
        yield id++
    }
}