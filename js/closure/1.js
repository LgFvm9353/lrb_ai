// add 函数 ，3个参数
function add(a,b,c)
{
   return a+b+c;
}
add(1,2,3);
function curry(fn)
{
    // fn ? 参数，最终执行的功能，闭包中的自由变量
    // curry 函数 包装fn,慢慢收集参数
    // ..args 表示所有的参数
    let judge = (...args) => {
        if(args.length >= fn.length) {
             return fn(...args);
        } else {
             return (...arg) => judge(...args, ...arg);
        }
     }
     return judge; // 添加这行返回judge函数
}
// function curry(fn) {
//     // 返回一个函数
//    let judge = (arg) => { // 剩余参数
//        if(arg.length === fn.length)  return fn(arg);
//        return (ag) => judge(arg,ag); 
//    }
   
// }
// 柯里化  手写一个curry 函数
let addCurry = curry(add);
// 逐步的去获取函数需要的参数，当参数满足的时候，执行函数
addCurry(1)(2)(3);
