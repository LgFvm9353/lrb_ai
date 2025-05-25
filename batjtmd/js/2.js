// 1.箭头函数
var obj = {
    a: 1,
    fn: () => console.log(this.a),
    fn2: function() {
        return () => console.log(this.a);
    }
}
obj.fn(); // undefined
obj.fn2()(); // 1

// 2.new绑定
function Foo(a) {
    this.a = a;
}
var instance = new Foo(2);
console.log(instance.a); // 2

// 3.bind/apply/call
function bar() { console.log(this.a) }
var ctx = { a: 3 };
bar = bar.bind(ctx);
bar(); // 3

// 4.obj.调用
var obj = { a:4, bar };
obj.bar(); // 4

// 5.直接调用
var a = 5;
bar(); // 3
var barCopy = obj.bar;
barCopy(); // 5

// 6.非函数环境
// console.log(this === window); // true（浏览器环境）