const arr = [1,2,3,4,5]

// const removed = arr.splice(1,2)
// console.log(removed)
console.log(arr)

// 如果不修改呢？移除但又不改变原数组 splice 不能用
const newArr = arr.slice(0,1).concat(arr.slice(1))
console.log(newArr)