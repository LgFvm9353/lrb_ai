# deepseek
- 大模型在哪？
  远程 

- LLM 服务
  http api 请求
  api 也一样
  fetch 赋予了JS 新生命

## WebLLM
  智能前端的战场
  - 如何把deepseek 接入到前端

## 运行项目
直接在浏览器打开index.html 页面就好

## 服务器端返回
- 输入一个url 或者点击一个链接 (比较死板)
- 向服务器端发送请求
- node/java 请求，去数据库取数据，生成html字符串
- 返回html字符串

## fetch请求
- 滚动到底部后，加载更多的数据 web2.0 富应用体验
  看到新的内容
- fetch url 
  - 不需要刷新页面，主动去服务端取一次， DOM更新页面
- 点赞的时候？
  js fetch api  like

- LLM AI 时代
  fetch 取来大模型的能力 智能前端时代

## http请求
  - 请求行 GET http://ww.baidu.com
    http://api.deepseek.com/chat/completions
  - 请求头 
    设置各种头部信息
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer xxx"
    }
  - 请求体
    发送给服务器的数据
    {
      "message": "hello",
      "temperature": 0.7
    }
    GET 没有请求体
    