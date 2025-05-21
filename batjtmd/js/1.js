var a;
console.log(typeof a); 

var isSingle = true;
let girlFriend = null;
console.log(typeof girlFriend);  //object

const array = [1,2,3,4,5,'6'];
console.log(typeof array);  

const ar = new Array(5).fill(0);
console.log(typeof ar) //object

const date = new Date();
console.log(typeof date); //object

// 如何区分Object 的这些类型？
console.log(Object.prototype.toString.call(array)); //[object Array]
console.log(Object.prototype.toString.call(date)); //[object Date]
console.log(Object.prototype.toString.call(girlFriend)); //[object Null]
console.log(Object.prototype.toString.call(isSingle)); //[object Boolean]
console.log(getTYpe(ar)); //[object Array]

function getTYpe(obj)
{
    return Object.prototype.toString.call(obj).slice(8,-1);
}


