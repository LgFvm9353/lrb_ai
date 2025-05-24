/**
 * @func 反转字符串
 * @param {*} str 
 * @return string
 */
function reverseString(str){
    // str是什么类型？字符串 简单数据类型
    return str.split('').reverse().join('');
}


console.log(reverseString('hello'));
console.log(Object.prototype.toString.call(reverseString)) 


// 函数表达式
const reverseString2 = function(str){
    return str.split('').reverse().join('');
}

// 箭头函数  function 不要了 => 
// 只有一行代码 {} 和 return 可省略
const reverseString3 = str=> str.split('').reverse().join('');

