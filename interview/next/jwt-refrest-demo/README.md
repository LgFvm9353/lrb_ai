# next.js 全栈项目

- users & posts 
- jwt 双token 鉴权
- 虚拟列表
  AI 爬虫 掘金100 条数据
- 大文件上传 
- ai 工程化 
   流式输出
   function Tool
   mcp 
- ai 搜索
## 双token
单token localStorage 长期，第三方拦截  不安全
双token   无感刷新 + 安全
- accessToken 短期 前端携带 后端验证
- refreshToken 长期 前端携带 后端验证 刷新 accessToken
   没有过期，refreshToken 发到服务器 /api/auth/refresh 
   返回新的 accessToken 无感刷新
- refreshToken 过期，重新登录

## 开发流程
- .env 
  mysql url 
  create database demo 
- prisma 初始化
  npx prisma init
  orm 工具 object relation mapping 
  User（表） =》 User 类
  一行 =》 new User() 实例 
  底层数据库 操作 映射成 高级的面向对象操作
  
- Prisma Schema 是定义数据库模型、关系和数据类型的配置文件，用于生成类型安全的数据库客户端
  数据库的设计图 
  navicat 好的地方，schema + git 留下数据库设计和修改的历史
  文档型的，可以追踪

- Model 表的映射模型 
  @@map("users") 制定模型对应的表名
  posts Post[] 关系映射 一对多的关系
  createdAt updatedAt prisma 自动维护
  @id 主键 @unique 唯一索引
  Model User{
    columns name type @default 
    索引
    relation
  }

  - migration 数据库迁移
    npx prisma migrate dev --name init

- restful API 
- lib/ 复用的 js 模块
- regexp 
   前端，后端 都要会正则 
   /^.+?[]{}$/  test
   . 任意字符，匹配一个
   + 匹配任意字符，至少一个
   ? 0次或一次
   [] 范围
   {} 长度 
- bcryptjs 加密js 模块 单向的加密模式 
   register 加密一次
   login password 加密一次
   比较的是加密后的字符串是否一样 
- 状态码 
  - 200 成功
  - 201 创建成功
  - 400 客户端错误
  - 401 未认证
  - 403 未授权
  - 404 未找到
  - 409 冲突
  - 500 服务器内部错误

- middleware 中间件
  全局的 中间件 所有的请求都要经过
  局部的 中间件 只有特定的路由才会经过
  配置一个白名单，白名单中的路由不经过中间件

  Middleware是一个中间件，用于在请求和响应之间执行预处理逻辑，如日志、认证、数据解析等
  - 配置一个需要登录的页面数组
  - some startWith
  - response.next() 放行
  - response.redirect() 重定向
  - 通过jwt verify 方法拿到payload 之后，添加了自定义的请求头 x-user-id 
    后续页面就可以拿到这个值
- JWT 构成
  - 头部（Header）
    包含了令牌的类型（JWT）和使用的签名算法（如HS256）
  - 载荷（Payload）
    包含了令牌的实际数据，如用户ID、过期时间等
  - 签名（Signature）
    用于验证令牌的真实性，确保令牌在传输过程中未被篡改

- cookie 
  - httpOnly: true     服务端设置 
  HttpOnly 可防止 JavaScript 访问 Cookie，有效抵御 XSS 攻击导致的令牌泄露。
  - secure: true 
  Secure 标志仅在 HTTPS 连接中发送 Cookie，防止在非加密通道中被窃取。
  - sameSite: 'strict'
    SameSite 可防止跨站请求伪造（CSRF）攻击，限制 Cookie 在跨域请求中的自动发送，提升安全性。
  - maxAge: 15 * 60
    过期时间 15 分钟
  - path: '/'
    路径 所有路径都可以访问到这个 cookie

- 后端安全和性能
  - 一定要做容错处理
      try {} catch(err) {} finally {}
  - 释放数据库对象

- prisma client 的CRUD 方法
   prisma.user.create()
   prisma.user.findUnique()
   prisma.user.findMany()
   prisma.user.update()
   prisma.user.delete()


## 大文件上传
当文件比较大的时候，由于各种原因，容易上传失败，而且上传速度慢。
一旦失败，需要重新上传，会让用户沮丧

采用分片上传策略（并发，并发限流）
- 分片上传
  把大文件分成多个小文件，每个小文件上传到服务器
- 并发上传
  多个小文件同时上传，提高上传速度
- 并发限流
  限制同时上传的小文件数量，防止服务器压力过大
上传前通过 WebWorker 计算文件整体以及分片的hash ,向服务器校验，若文件已存在，则直接妙传。前端记录上传进度和已成功分片，支持端点续传，避免重复上传。服务器按序接受分片，存储后进行合并，并检验最终文件的完整性，结合唯一标识符和分片索引确保文件一致性。整个过程配合进度条和错误重试机制，提升用户体验与系统健壮性。


- worker hash计算
  为了不阻塞主线程，计算文件的 hash 值，采用 WebWorker 计算
  计算完成后，将 hash 值返回给主线程

- 性能优化
   上传文件的处理函数 handleFile 使用 useCallback 缓存，避免重复创建

- typescript的使用
  - 主线程和worker 线程间的 通信，数据约定
    HashWorkerIn 主线程向worker 线程发送的消息
    HashWorkerOut worker线程向主线程发送的消息
    as 断言