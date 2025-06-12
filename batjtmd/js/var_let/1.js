"use strict"
var b = 10;
(function b(){
    b = 20; // 非严格模式下，修改b不生效的
    console.log(b);
})()