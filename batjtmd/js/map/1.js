// NaN Not a Number 不是数字
// parseInt 

//map 方法会对数组中的每个元素执行一次提供的函数，并返回一个新数组。该函数接收三个参数：当前元素的值、当前元素的索引和原数组。
//parseInt 方法用于将字符串转换为整数，它接收两个参数：要转换的字符串和可选的进制数（基数）
console.log(['1','2','3'].map(item=>parseInt(item)))