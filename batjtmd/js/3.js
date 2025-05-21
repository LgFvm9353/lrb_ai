//
var b = 2;  //es5
b = 3;
let a = 1;  //es6
a++;
console.log(a,b);

// 全局作用域

function fn(){  //函数作用域

}

if(false) // 块级作用域
{
    let value = 1;
}
console.log(value);