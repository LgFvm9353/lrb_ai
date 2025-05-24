let a = "abc";
let b = new String("abc");
console.log(a == b) //true
// js 给所有的简单数据类型提供了 相应的类型 包装类
console.log(a === b); //false

console.log(b.split("")) //[ 'a', 'b', 'c' ]
// 为了统一面向对象的写法
//js 会主动的把简单的数据类型包装成对象
// a -> new String(a) 

console.log(a.split("")) //[ 'a', 'b', 'c' ]
// 之后会销毁对象，回归原来的简单类型