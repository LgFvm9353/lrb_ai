// 如何遍历数组
// 1. for 循环
// 2. forEach 方法
// 3. for...of 循环
// 4. map 方法
// 5. filter 方法
// 6. reduce 方法
// 7. some 方法
// 8. every 方法
// 9. find 方法

const names = Array.of('Alice','Bob','Charlie','David','Eve')
console.log(names)
names.forEach((name,index) => console.log(`${index+1}.${name}`))
names.map((name,index) => console.log(`${index+1}.${name}`))
names.filter((name,index) => console.log(`${index+1}.${name}`))
names.reduce((acc,name,index) => console.log(`${index+1}.${name}`),[])
names.some((name,index) => console.log(`${index+1}.${name}`))
names.every((name,index) => console.log(`${index+1}.${name}`))
for(let name of names){ // 迭代器
    console.log(name)
}