const arr = [1,2,3,4,5]

const result = arr.filter(num => num >=2) 

console.log(result)

// 时间复杂度 O(n)
// 能优化吗？ 不能优化
// 但是如果被告知已经排好序的前提下，可以使用 二分查找 


const index = arr.findIndex(num => num > 2)
console.log(arr.slice(index))
