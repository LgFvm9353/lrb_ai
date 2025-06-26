# 流式输出

- 为什么会考这道题？
  25年大厂必考题
  - LLM 聊天机器人（23年的AI爆款 -》 24年 推理 -》25年Agent元年）
  - 流式输出 属于 用户体验 前端职责所在

- 为何需要流式输出？
  - 数据边生成边传输？
    后端、LLM API 方式提供给我们？
    AIGenerticContent 生成式的大模型 一个token一个token transform(google) 出来的
    "我是你的assistant" token开销付费的 
    更快的看到响应
- 前端的职责
  - 良好的用户体验
  - 尽快反馈结果
  
  流式输出是一个障眼法  生成要花时间，我愿意等
  最懂用户心理的

- 步骤
  - 怎么在前端实现流式输出？
    setInterval 简单版本的流式输出
    异步 事件监听 message 
  - 后端又怎么实现？
    socket 长链接 http请求是基于请求响应式的简单协议 关闭连接
    http2.0 server push 服务端推送

## 全栈能力
  - npm init -y  node后端项目
  - npm i express 老牌的node后端框架

