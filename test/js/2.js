// BarProp.prototype = Object.create(Prop.prototype);
// Object.setPrototypeOf(BarProp.prototype, Prop.prototype);

// 用来判断o1 是否关联到（委托）o2的辅助函数
// function isRelatedTo(o1,o2)
// {
//     function F(){};
//     F.prototype = o2;
//     return o1 instanceof F;
// }
// const a = {};
// const b = Object.create(a);
// console.log(isRelatedTo(b,a));//true


var anotherObject = {
    a:2
}
var myObject = Object.create(anotherObject,{
    b:{
        enumerable:true,
        writable:true,
        configurable:true, 
        value:3
    },
    c:{
        enumerable:true,
        writable:true,
        configurable:true,
        value:4
    }
});
// console.log(myObject.hasOwnProperty("a"));//false
// console.log(myObject.hasOwnProperty("b"));//true
// console.log(myObject.hasOwnProperty("c"));//true
// console.log(myObject.hasOwnProperty("d"));//false
// console.log(myObject.a);//2
// console.log(myObject.b);//3
// console.log(myObject.c);//4
// console.log(myObject.d);//undefined

// var anotherObject = {
//     cool:function(){
//         console.log("cool");
//     }
// }
// var myObject = Object.create(anotherObject);
// myObject.doCool = function(){
//     this.cool(); //this 指向myObject
// }
// myObject.doCool();//cool


// 委托理论
// Task = {
//     setId: function(ID)
//     {
//         this.id = ID;
//     },
//     outputID: function(){
//         console.log(this.id);
//     }
// }
// //让XYZ来委托Task
// XYZ = Object.create(Task);
// XYZ.prepareTask = function(ID,Label){
//     this.setId(ID);
//     this.label = Label;
// }
// XYZ.outputTaskDetails = function(){
//     this.outputID();
//     console.log(this.label);
// }


// 1. 面向对象风格
// function Foo(who){
//     this.me = who;
// }
// Foo.prototype.identify = function(){
//     return "I am " + this.me;
// }
// function Bar(who){
//     Foo.call(this,who);
// }
// Bar.prototype = Object.create(Foo.prototype);
// Bar.prototype.speak = function(){
//     console.log("Hello, " + this.identify() + ".");
// }
// const b1 = new Bar("b1");
// const b2 = new Bar("b2");
// b1.speak();//Hello, I am b1.
// b2.speak();//Hello, I am b2.

// 2.对象关联风格
const Foo = { 
    init: function(who){
        this.me = who;
    },
    identify: function(){
        return "I am " + this.me;
    }
}
const Bar = Object.create(Foo);
Bar.speak = function(){
    console.log("Hello, " + this.identify() + ".");
}
const b1 = Object.create(Bar);
b1.init("b1");
const b2 = Object.create(Bar);
b2.init("b2");
b1.speak();//Hello, I am b1.
b2.speak();//Hello, I am b2.