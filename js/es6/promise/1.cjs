// 读取1。html 里面的内容
// 读取完后 打印 读完了
const fs = require('fs'); // 引入js内置文件模块
const readFilePromise = new Promise((resolve)=>{
    fs.readFile('./2.html', function(err, data) { // 读取文件 路径 编码格式 回调函数
        if (err) { // 如果有错误 打印错误
            console.log(err);
        } else { // 如果没有错误 打印读取到的内容
            console.log(data.toString());
            resolve()
        }
    });
  
})

console.log('111');
readFilePromise.then(()=>{
    console.log('读完了');
})