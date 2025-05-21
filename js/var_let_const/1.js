// 代码： 编译阶段  执行阶段
// 编译阶段，一霎那，语法检测
// 变量提升是面试官喜欢额，JS开发者设计的糟粕
// 不好，代码的执行结果和代码阅读顺序不一致，有歧义
// 申明变量不再使用var，用let，const


// 编译阶段： 1. 代码的词法分析  2. 代码的语法分析  3. 代码的生成
// 执行阶段： 1. 执行上下文  2. 执行栈  3. 垃圾回收机制
// 执行上下文： 1. 变量对象  2. 作用域链  3. this
// 变量对象： 1. 全局变量对象  2. 函数变量对象  3. 块级变量对象
// 作用域链： 1. 全局作用域链  2. 函数作用域链  3. 块级作用域链
// this： 1. 全局this  2. 函数this  3. 箭头函数this
// 垃圾回收机制： 1. 标记清除  2. 引用计数
// 标记清除： 1. 标记  2. 清除
// 引用计数： 1. 引用  2. 计数
// 变量提升： 1. 变量声明  2. 变量赋值
// 函数提升： 1. 函数声明  2. 函数表达式
// 块级作用域： 1. let  2. const  3. var
// 箭头函数： 1. 箭头函数  2. 函数表达式
// 闭包： 1. 闭包  2. 函数作用域
// 原型： 1. 原型  2. 原型链
// 继承： 1. 继承  2. 原型链
// 异步： 1. 异步  2. 回调函数
// 事件循环： 1. 事件循环  2. 宏任务  3. 微任务
// 异步任务： 1. 异步任务  2. 宏任务  3. 微任务
// 宏任务： 1. setTimeout  2. setInterval  3. setImmediate  4. requestAnimationFrame  5. I/O  6. UI rendering
// 微任务： 1. Promise  2. MutationObserver  3. process.nextTick  4. Object.observe  5. MessageChannel  6. setImmediate  7. requestAnimationFrame  8. I/O  9. UI rendering
// 浏览器： 1. 浏览器  2. 浏览器内核  3. 浏览器API
// 浏览器内核： 1. 渲染引擎  2. JS引擎  3. 网络模块  4. 插件模块  5. 用户界面模块  6. 浏览器模块

// 当前作用域的顶部
showName()  //驼峰式命名
console.log(myName);

myName = 'zs'
function showName(){
    myName = 'ls'
}