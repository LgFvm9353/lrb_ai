// 作用域
// 作用域链 内部的无法访问外部
// 函数外部无法读取函数内的局部变量
// 全局作用域

let n = 999;

function f1(){
    b = 123;
    // 函数作用域
    console.log(n); 
}
f1();
