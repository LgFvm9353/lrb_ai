# jwt 登录鉴权
- isLogin user 全局状态 zustand 
- mock 登录模拟
   - apifox api请求模拟
   不用写页面，就可以发送请求 
   curl 

- 会话授权
  - 服务器知道我们是谁？
  - http是无状态的
     - 请求头 cookie 
     - server 种下一个cookie 唯一 sid 值 
     - 每次请求中从 cookie 读取 sid
     - 服务器就根据 sid 知道我们是谁

  - 登录和用户鉴权方案JWT
    - {id: 112, username: 'good',level:4}
    - 一种算法 生成一个hash 串
    - token 服务器端令牌
    - 带上token
    - decode 解码

  - jsonwebtoken
    jwt 鉴权的库
    sign 颁发一个token user
    verify 验证token user
    - pnpm i jwt
    - import jwt from 'jsonwebtoken'
    