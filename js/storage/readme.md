# Storage 存储
  - 前端存储
    - localStorage
    - sessionStorage
    - cookie
    存储什么？
      - 登录状态
      - 购物车
      - 
    - IndexedDB
    - Web SQL
    - File System API
  - 后端存储
    - MYSQL 
    - MongoDB
    - NoSQL
    - Redis 缓存

## 首页
- 用户的登录状态
  cookie 
  - 服务器识别用户身份
  - B/S 架构软件 http 协议
  - http 0.9 版本  没有身份这样的东西
  - http 1.0 版本  引入了 cookie 身份
  - http 1.1 版本  引入了 session 身份
  - http 2.0 版本  引入了 token 身份
  - 服务器端存储用户的登录状态  存储在服务器端的内存中  内存中的数据  服务器重启  数据就会丢失

  - http是无状态协议  
    请求1次与1000次，拿到的内容都一致
    如何带上身份状态？ 
  - http 1.0 版本 
    header 请求头
    Content-Type
    Authorization
    Cookie 
    用户带上（首次没有） ，服务器解析
   http协议仍然是无状态的 ，请求头 可以夹带一些私货

- 界面有哪些状态？
  - 未登录 已登录 登录过期


- 前后端联调
  - 前端表单
    阻止默认行为
    收集表单数据
    fetch 发送请求 await 等待服务器端响应请求
    POST /login  api 地址  前后端接口

  - 后端
    路由  /login
    用户名和密码的校验
    通过设置cookie 响应头 Set-Cookie
    服务器端的返回 http 一起回到请求端
    前端存储里 Cookie 有了内容

## Cookie
  Cookie 是浏览器存储的小文本数据，用于记录用户会话、偏好等信息，便于网站识别用户。
  - 每次http请求的时候，会自动带上cookie信息（首次不会）
  - cookie 内容小 关键的身份信息，存储在浏览器中
  - http 协议还是无状态的，每次请求独立，通过请求头中的cookie信息实现身份的认证


    



    

