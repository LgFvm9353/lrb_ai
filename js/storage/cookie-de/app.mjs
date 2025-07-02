// es6模块化
// mjs 后缀使用es6模块化
// 模块化是语言的能力
// node 默认不支持es6模块化，需要使用babel编译
// node 最新版本 22 支持了es6模块化
// node 准备跟require commonJS say goodbye
// es6 module 更先进 mjs 
import http from 'http';
const server = http.createServer((req, res) => { 
    res.writeHead(200, { 'Content-Type': 'text/plain' }); 
    res.end('Hello World\n'); 
})
server.listen(1234);