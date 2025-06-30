// 让局部变量在全局被访问
function f1(){
    let n = 99;
    return function(){
        console.log(n);
    }
}
f1()();