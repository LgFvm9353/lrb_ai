'use strict';
Function.prototype.myCall = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Function.prototype.myCall called on non-function');
    }

    // 处理Node环境和浏览器环境
    const globalObj = typeof window !== 'undefined' ? window : global;
    context = context === null || context === undefined ? globalObj : Object(context);

    const fnKey = Symbol('fn');
    Object.defineProperty(context, fnKey, {
        value: this,
        configurable: true,
        enumerable: false
    });

    try {
        return context[fnKey](...args);
    } finally {
        delete context[fnKey];
    }
};

let name = "Trump"
function gretting(){
     return `hello,I am ${this.name}`;
}
const lj = {
     name: "雷军"
}
console.log(gretting.myCall(lj));