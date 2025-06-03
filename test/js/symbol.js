// 每个symbol都是唯一的
let sym = Symbol('a');
console.log(sym); // "Symbol(a)"

//1. symbol 显示转换为字符串
console.log(sym.toString()); // "Symbol(a)"
console.log(String(sym)); // "Symbol(a)"
console.log(sym.description); // a

//2. symbol 转换为布尔值，true
Boolean(sym); // true
!sym; // false
if (sym) { // if (true)
  // ...
}

// 3. symbol 作为属性名
let mySymbol = Symbol();
let a = {};
a[mySymbol] = 'Hello!';  // 不能用点运算符,因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的值，导致a的属性名实际上是一个字符串，而不是一个symbol值。
console.log(a[mySymbol]); // "Hello!"

// 4. 属性名的遍历
// symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
// 但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有symbol属性名。
let s = Symbol();
const obj = {};
let b = Symbol('b');
let c = Symbol('c');
obj[b] = 'Hello';
obj[c] = 'World';
const objectSymbols = Object.getOwnPropertySymbols(obj); // 获取所有symbol属性名
console.log(objectSymbols); // [Symbol(b), Symbol(c)]
console.log(Reflect.ownKeys(obj));  // [Symbol(b), Symbol(c)]  ,可以返回所有类型的键名，包括常规键名和 Symbol 键名。

let size = Symbol('size');
class Collection{
    constructor(){
        this[size] = 0;
    }
    add(item){
        this[this[size]++] = item;
    }
    static sizeOf(instance)
    {
        return instance[size];
    }
}
let x = new Collection();
console.log(Collection.sizeOf(x)); // 0
x.add('foo');
console.log(Collection.sizeOf(x)); // 1
console.log(Object.keys(x)); // [ '0' ]
console.log(Object.getOwnPropertyNames(x)); // [ '0' ]
console.log(Object.getOwnPropertySymbols(x)); // [Symbol(size)]
// Object.keys(x);
// Object.getOwnPropertyNames(x);
// Object.getOwnPropertySymbols(x);