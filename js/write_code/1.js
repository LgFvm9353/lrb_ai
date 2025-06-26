// 完成的功能
// es6 版本
function objectFactory(Constructor, ...args){
    var obj = {};
    // 类数组没有shift方法，所以需要借用数组的shift方法
    // var Constructor = [].shift.call(arguments); // 传入的构造函数
    obj.__proto__ = Constructor.prototype; // 将obj的原型指向构造函数的原型，这样obj就可以访问到构造函数原型中的属性和方法了，相当于继承了构造函数的原型
    var ret = Constructor.apply(obj, args); // 改变构造函数的this指向，指向obj，这样obj就可以访问到构造函数中的属性和方法了
    // || null 的情况，仍然会返回Object  构造函数 return 简单类型 忽略
    return typeof ret === 'object' ? ret || obj : obj; // 如果构造函数返回的是一个对象，那么就返回这个对象，否则返回obj，相当于返回了构造函数的返回值，如果构造函数没有返回值，那么就返回obj，相当于返回了构造函数的返回值，也就是obj，相当于返回了构造函数的实例，也就是obj; 
}

function Person(name, age){
    this.name = name;
    this.age = age;
    // return 1;
    // return {
    //     name: name,
    //     age: age,
    //     label: 'person'
    // }
}

// new Person(...) -> function[[construct]] -> {} && this -> {} ->
// [[call]] -> {}.__proto__ -> Constructor.prototype -> {} 

Person.prototype.say = function(){
    console.log(this.name, this.age);
}

let p = objectFactory(Person, 'jack', 12);
console.log(p); 
p.say();
console.log(p instanceof Person); // true 
