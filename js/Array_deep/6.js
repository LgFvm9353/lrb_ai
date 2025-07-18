const arr = [1,2,3]
// 可迭代对象
// for(let item of arr)
// {
//     console.log(item)
// }
for(const item of arr.entries()){
    // 每一项都是数组，第一项是索引，第二项是值
    console.log(item)
}

for(const [index,item] of arr.entries()){
    console.log(index,item)
}


