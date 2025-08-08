# 面试热题 跨域
- 大前端
  - React/Vue mvvm  前端
  - node.js  后端
  - 移动端（ios\android\）
  - 桌面端 exe  vscode 用ts写出来的
  - 嵌入式
- 前后端联调
   - 前后端分离 跨域

- 为什么要学习跨域
  - 前后端分离式日常开发的形式，端口或域名或协议不一样
  - CORS Policy 同源策略
     浏览器端的机制
  - 跨域请求被block掉了
     请求到大了服务器端吗？
     请求到达了
     浏览器的CORS策略
  - 安全问题？
    - 前端（千千万万的用户）的安全，攻击
    - 跨源的，可能不一定被信任
  - 怎么解决跨域？
    - 即拿到cross origin 的资源，同时又不违反CORS 机制
    fetch/xhr 被CORS 机制给管控了
    Cookie/localStorage 也是
    - img script link 可以跨域
    - 不用被管着的fetch/xhr/axios,用script

- 使用script的跨域解决方案 JSONP
  - script src 发送一个请求
  - jsvascript 返回
  - 前端想要的是JSON ,还要可以继续执行
  - 前端埋一个函数
     - 后端返回一个JS函数的执行
     - 在执行时将数据传给函数
  - 需要后端的配合

  - 返回json
  JSON

- JSONP 利用了 script 可以跨域访问
    - 前端使用 script src = 跨域的资源请求地址
    - 需要后端配合，返回JSON 外面包含着函数
    - 页面上有个函数在等待执行
    - 复杂，能不能封装一下？

- 手写JSONP
  - 获取动态数据，script 标签原来设计用于加载静态JS
  - 后端配合解析 script url get 请求中的callback 参数值
  请求A,请求B ...
  - 前端封装


## 进阶跨域方案 cors
- 日常用的最多的跨域解决方案
   浏览器会发送CORS 通信，如果服务器端的响应头设置了Access-Control-Allow-Origin,后端实现了CORS,可以跨域
   * 白名单

   - 简单跨域请求
     GET/POST 简单设置下Access-Control-Allow-Origin 即可
     Content-Type: application/x-www-form-urlencoded, multipart/form-data, text/plain

   - 复杂跨域请求
      其他的方案 安全升级
      - 预检请求 
       Access-Control-Allow-Methods  PUT,PATCH,DELETE,OPTIONS,GET,POST


       Access-Control-Allow-Headers Content-Type: Authorization
