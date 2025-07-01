# 手写call

- 手动指定this的指向
- 参数一个一个的传
- 第一个参数是null或者undefined，指向window
  严格模式报错

- bind、call和apply应用场景的区别？
  - call apply 立即执行，区别是参数传递的方式不同 call 一个一个的传，apply 数组的形式传
  - bind 不会立即执行，返回一个函数，需要手动执行

## 手写call
- call 是属于所有函数的方法，所以我们需要在Function.prototype上添加一个call方法
- 第一个参数是this的指向，第二个参数是一个数组，或者是一个参数列表

## 包含的技能点
 - 原型 Function
 - 函数参数的理解
   context ,rest 运算符
 - context 为 null undefined -> window 
 - 在context 上挂载方法，轻松实现函数内部的this
   js 动态性 污染了context
   es6 Symbol 唯一值，不会覆盖context的属性
   delete context上的属性
