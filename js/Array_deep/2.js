// fill 一样的
console.log(Array.of(1,2,3))

// 复杂的计算或者转变
console.log(Array.from(new Array(26),(val,index) => String.fromCodePoint(65+index)))
