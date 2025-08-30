// node 运行 global 顶级对象

console.log(process.memoryUsage())

let map = new Map()


let key = new Array(1000000)

map.set(key,1)

console.log(process.memoryUsage())

key = null  // 手动释放null ,但是map 是强引用
// global.gc()  // 手动触发垃圾回收
console.log(process.memoryUsage())

map = null 
global.gc()  // 手动触发垃圾回收
console.log(process.memoryUsage())
