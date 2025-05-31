//1. 导入 http 模块
// const http = require('http');
import http from 'http';
//2. 创建服务对象
const server = http.createServer((request,response)=>{
    response.setHeader('Content-Type','text/html;charset=utf-8'); //设置响应头，防止中文乱码
    response.end('hello Http Server'); //设置响应体
});
//3. 监听端口,启动服务
server.listen(9000,()=>{
    console.log('服务器启动成功');
});


