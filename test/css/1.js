const arr = [10, 2, 30];
arr.sort(); 
// 实际执行了: ['10', '2', '30'].sort((a,b) => a.localeCompare(b))
console.log(arr); // [10, 2, 30]