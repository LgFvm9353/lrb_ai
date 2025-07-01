'use strict';
Function.prototype.myApply = function(context, argsArray) {
    if (typeof this !== 'function') {
        throw new TypeError('Function.prototype.myApply called on non-function');
    }

    // 类数组检查
    if (argsArray !== undefined && argsArray !== null && 
        (!(typeof argsArray === 'object') || !('length' in argsArray))) {
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }

    const globalObj = typeof window !== 'undefined' ? window : global;
    context = context === null || context === undefined ? globalObj : Object(context);

    const fnKey = Symbol('fn');
    Object.defineProperty(context, fnKey, {
        value: this,
        configurable: true,
        enumerable: false
    });

    try {
        // 转换类数组为真实数组
        const args = argsArray ? Array.from(argsArray) : [];
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
 console.log(gretting.myApply(lj));