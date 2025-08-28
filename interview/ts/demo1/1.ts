let a:any = 1;  // any 任何类型

let b:unknown = 1;  // unknown 未知类型

let c:never;
a = '1'  // 不能滥用

function getFirstElement<T>(arr:T[]):T|undefined{
  return arr.length >0 ? arr[0] : undefined
}

// 复用性 
// 函数参数，返回值 指定类型
const arr = [1,2,3]
const firstNum = getFirstElement<number>(arr)
console.log(firstNum)
// 复用函数的同时，传入类型参数



