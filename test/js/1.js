// function setupBot(name, selector) {
//     $(selector).click(function activator() {
//         console.log("activating: " + name);
//     })
// }
// setupBot("Closure Bot 1", "#bot_1");
// setupBot("Closure Bot 2", "#bot_2");


// for(let i=0;i<5;i++)
// {
//     setTimeout(function(){
//         console.log(i);
//     },1000)
// }

// for(var i=0;i<5;i++)
// {
//     ((j)=>{
//         setTimeout(function(){
//             console.log(j);
//         },1000)
//     })(i)
// }
// var MyModules = (function Manager() {
//     var modules = {};
//     function define(name, deps, impl) {
//         for (var i = 0; i < deps.length; i++) {
//             deps[i] = modules[deps[i]];
//         }
//         modules[name] = impl.apply(impl, deps);
//     }
//     function get(name) {
//         return modules[name];
//     }
//     return {
//         define: define,
//         get: get
//     };
// })();

// MyModules.define("bar",[],function(){
//     function hello(who)
//     {
//         return "Let me introduce:"+who;
//     }
//     return {
//         hello: hello
//     };
// })
// MyModules.define("foo",["bar"],function(bar){
//     var hungry = "hippo";
//     function awesome()
//     {
//         console.log(bar.hello(hungry).toUpperCase());
//     }
//     return {
//         awesome: awesome
//     };
// });
// var bar = MyModules.get("bar");
// var foo = MyModules.get("foo");
// console.log(bar.hello("hippo"));
// foo.awesome();


// 在对象中，属性名永远都是字符串
// 可计算属性名： [] 

// 数组 []
// var myArray = ['foo',42,"bar"];
// myArray.baz = "baz";
// myArray[3] = "qux";
// myArray.corge = "corge";
// console.log(myArray.length);
// console.log(myArray.baz);
// console.log(myArray);

// getter 和 setter
// var myObject = {
//   get a(){
//     return 2;
//   }
// }
// Object.defineProperty(myObject,"b",{
//   get :function() {
//     return this.a * 2;
//   },
//   enumerable: true
// })
// console.log(myObject.a); //2
// console.log(myObject.b); //4


// var myObject = {
//     get a(){
//         return this._a_;
//     },
//     set a(val){
//         this._a_ = val * 2;
//     }
// }
// myObject.a = 2;
// console.log(myObject.a); // 4


// var myArray = [1,2,3];
// var it = myArray[Symbol.iterator]();
// console.log(it.next()); // {value: 1, done: false}
// console.log(it.next()); // {value: 2, done: false}
// console.log(it.next()); // {value: 3, done: false}
// console.log(it.next()); // {value: undefined, done: true}

// var myObject = {
//     a: 2,
//     b: 3
// };

// Object.defineProperty(myObject, Symbol.iterator, {
//     enumerable: false,
//     writable: false,
//     configurable: true,
//     value: function(){
//         var o = this;
//         var idx = 0;
//         var ks = Object.keys(o);
//         return{
//             next: function(){
//                 return {
//                     value: o[ks[idx++]],
//                     done: (idx > ks.length)
//                 }
//             }
//         }
//     }
// })
// // 手动遍历myObject
// var it = myObject[Symbol.iterator]();
// console.log(it.next()); // {value: 2, done: false}
// console.log(it.next()); // {value: 3, done: false}
// console.log(it.next()); // {value: undefined, done: true}
// for(var v of myObject){
//     console.log(v); // 2,3
// }


import _ from 'lodash';
const obj = { a: 1, b: { c: 2 } };
const copy = _.cloneDeep(obj);
copy.b.c = 3;
console.log(obj.b.c); // 输出 2

// const obj = { a: 1, b: { c: 2 } };
// const copy = structuredClone(obj);
// copy.b.c = 3;
// console.log(obj.b.c); // 输出 2

// const obj = { a: null };
// obj.a = obj;
// JSON.stringify(obj); // TypeError: Converting circular structure to JSON


// const data = { 
//     fn: () => {}, 
//     sym: Symbol(), 
//     undef: undefined 
//   };
//   const copy = JSON.parse(JSON.stringify(data));
//   console.log(copy); // {}（函数/Symbol/undefined丢失）

// const obj = { date: new Date() };
// const copy = JSON.parse(JSON.stringify(obj));
// console.log(typeof obj.date); // object
// console.log(typeof copy.date); // string

// function foo(){}
// foo.prototype.constructor  = foo;
// var a = new foo();
// console.log(a.__proto__.constructor === foo); //true
// console.log(a.__proto__.constructor === a.constructor) //true
// console.log(a.constructor === foo); // true
// var b = Object.create(foo.prototype);
// console.log(b.constructor === foo); // true


// function Foo(){};
// Foo.prototype = {
//    constructor: Foo, // 显式指定constructor
// }
// console.log(Foo.prototype.constructor); // false
// var a1 = new Foo();
// console.log(a1.constructor === Foo); // false
// console.log(a1.constructor === Object)
// console.log(a1.constructor === a1.__proto__.constructor) // true
// console.log(Object.getPrototypeOf(a1).constructor === Foo) // true

function Foo(name)
{
    this.name = name;
}
Foo.prototype.myName = function(){
    return this.name;
}
function Bar(name,label){
    Foo.call(this,name);    
    this.label = label;
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.myLabel = function(){
    return this.label;
}
var a = new Bar("a","obj a");
console.log(a.name); // "a"
console.log(a.label); // "obj a"
console.log(a.myName()); // "a"
console.log(Bar.prototype.constructor === Foo); // Foo
console.log(a.__proto__ == Bar.prototype); // true
console.log(Bar.prototype.__proto__ === Foo.prototype); // false