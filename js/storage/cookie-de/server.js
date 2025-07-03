// node 后端
// express 是一个框架，是一个应用
// http模块是node内置的核心模块
// js有两种模块化系统：CommonJS和ES Module
// require node 早期模块化 commonJS
// import ES6 更先进的模块化方案
// CommonJS是同步加载模块（运行时加载），ES Module是异步加载模块（编译时加载）

// node 受欢迎 适合于中小型开发
// 端口 -》 某个服务
// 3306 mysql 数据库端口  进程（资源） 线程（执行）
// 8080 http 服务端口 （tomcat）
// 80 http 服务端口 （nginx）

// domain（localhost） -> ip 地址（127.0.0.1） -> 某台设备 -》 端口 -》 进程 -》 线程 -》 代码
// 每个端口可以使用多个进程，每个进程可以使用多个线程，每个线程可以执行多个代码
// 一台设备上可以很多端口使用，有多个http服务 多个网站
// 不要使用一些特殊端口
const http = require('http'); // 引入http模块
// import http from 'node:http'
const fs = require('fs') // 引入fs模块 读取文件
const path = require('path') // 引入path模块 处理路径
const url = require('url') // 引入url模块 处理url

const server = http.createServer((req, res) => { 

    // http 基于请求响应的协议
    // 路由 Method + url 定位了服务器端的资源
    // 为了资源
    if(req.method === 'GET' && req.url === '/' || req.url === '/index.html')      
    {
        fs.readFile(path.join(__dirname, 'public','index.html'), 
        // 异步 callback
        (err, data) => { 
            // 后端稳定为主，前端体验为主
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
            // 不只是 html,css,js
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data.toString());
        })
    }
    // 后端路由，暴露资源
    // http://localhost:8080/style.css
    // http 协议
    // localhost:8080 域名
    // /style.css 路径
    if(req.method === 'GET' && req.url === '/style.css')
    {
        fs.readFile(path.join(__dirname,'public', 'style.css'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        })
    }

    if(req.method === 'GET' && req.url === '/script.js')
    {
        fs.readFile(path.join(__dirname,'public','script.js'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(data);
        })
    }

    if(req.method === 'POST' && req.url === '/login')
    {
        //用户名和密码的校验
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            // 服务器端设置的cookie 客户端可以读取
            "set-cookie": "username=admin;password=123"
            // 'Set-Cookie': 'username=admin;password=123;path=/;httpOnly;max-age=3600'
         }); 
        res.end(
            JSON.stringify({
                success: true,
                msg: '登录成功'
            })
        )
    }
    if(req.method === 'GET' && req.url === '/checkLogin')
    {

        if(req.headers.cookie) {
            req.headers.cookie.split(';').forEach((cookie) => {
                const [key, value] = cookie.split('=');
                if(key === 'username' && value === 'admin')
                {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(
                        JSON.stringify({
                            success: true
                        })
                    )
                }   
            })
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    success: false
                })
            )
        }
    }
})


server.listen(1234);

