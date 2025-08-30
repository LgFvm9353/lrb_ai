global.gc()
console.log(process.memoryUsage())

const wm = new WeakMap()

let key = new Array(1000000)

wm.set(key,1)

console.log(process.memoryUsage())

key = null
global.gc()
console.log(process.memoryUsage())

