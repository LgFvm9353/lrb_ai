// 数组的高级方法
// reduce 的本质 消灭数组
// 负责在繁杂的case 下只有唯一的对的状态产生
// 新的状态基于上一个状态
console.log([1,2,3,4,5].reduce((prev,curr)=>{
    return prev+curr
},0))

