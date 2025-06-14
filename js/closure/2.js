// 函数对象
function add(a,b,c) {
    // arguments 函数运行时，参数总管
    // 通过下标访问第几个参数 数组
    // console.log(arguments,Object.prototype.toString.call(arguments))
    // 类数组，有length属性，不能使用数组方法，但是可以使用for循环遍历
    // console.log(arguments.map((item) => {
    //     item+1;
    // }));
    // 如何将类数组转成真正的数组？
    const args = Array.from(arguments);
    console.log(Object.prototype.toString.call(args));
    let result = 0;
    for(let i=0;i<arguments.length;i++) {
        console.log(arguments[i])
        result += arguments[i]
    }
  return result;
}
console.log(add(1,2,3));

console.log(add.length)