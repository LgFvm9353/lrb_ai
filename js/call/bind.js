
'use strict';
Function.prototype.myBind = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Function.prototype.myBind called on non-function');
    }

    const self = this;
    const globalObj = typeof window !== 'undefined' ? window : global;
    const boundContext = context === null || context === undefined ? globalObj : Object(context);

    const boundFunction = function(...newArgs) {
        // 使用instanceof检测构造函数调用
        if (this instanceof boundFunction) {
            return new self(...args, ...newArgs);
        }
        return self.apply(boundContext, [...args, ...newArgs]);
    };

    // 维护原型链
    if (this.prototype) {
        boundFunction.prototype = Object.create(this.prototype);
    }

    return boundFunction;
};

// let name = "Trump"
// function gretting(){
//      return `hello,I am ${this.name}`;
// }
// const lj = {
//      name: "雷军"
// }
// const boundGretting = gretting.myBind(lj);
// console.log(boundGretting());

const person = {
    name: '张三',
    sayHello: function(greeting) {
      console.log(`${greeting}, 我是${this.name}`);
    }
  };
  
  const sayHello = person.sayHello.myBind({name: '李四'}, '你好');
  sayHello(); // 输出"你好, 我是李四"
