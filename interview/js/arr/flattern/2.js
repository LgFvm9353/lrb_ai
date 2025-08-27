let arr = [3,1,2]

console.log(arr.sort(),arr)

// arr.sort() 默认按字典排序 ASCII 值
console.log([10,1,20,3,15,5].sort())

// >= 0 不交换
// < 0 交换
console.log([10,1,20,3,15,5].sort((a,b)=>{
    return a-b
}))
