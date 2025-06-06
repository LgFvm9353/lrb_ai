// 这里可以添加你的JavaScript代码
// console.log('WebLLM项目已启动');
// js主动拉取http结口
// web1.0 时代 html/css/js 服务器端java返回 的js只做简单的交互
// web2.0 时代 js 主动的请求后端服务器的动态页面
// 掘金页面可以一直往下滑 背后就是一个fetch请求
// fetch('https://api.github.com/users/shunwuyu/repos')
//   .then(res => res.json())
//   .then(data => {
//     // console.log(data);
//     document.querySelector('#reply').innerHTML =data.map(repo=>
//      `
//      <ul>
//        <li>${repo.name} </li>
//      </ul>
//     `).join('')
//   })

// 当LLM API 服务
// chat 方式 AIGC 生成/完成 返回的内容
// 由openai 制定的
//请求行
//命名
// webLLM web底层 是 http协议
//llm api服务 
// api.deepseek.com deepseek二级域名  将LLM的服务以api的形式对外提供
// https 加密的http，更加安全
// chat 聊天的方式  messages
// completions 完成 聊天的对话
const  endpoint = "https://api.deepseek.com/chat/completions"
// 请求头
const headers = {
  // 内容类型
  'Content-Type': 'application/json',
  // 授权
  Authorization: `Bearer sk-41d9a4f08144439c8f3ff22cd58ce16b`
}
// 请求体
const payload = {
  model: 'deepseek-chat',
  // chat 三种方式
  // 1. 系统角色  只会出现一次  一般是用来设定角色的 开始会话时
  // 2. 用户角色  user 提问
  // 3. 助手角色  assistant 回答
  messages: [
    { role: 'system', content: 'You are a helpful assistant.'},
    { role:'user', content: '你好 Deepseek'}
  ]
}

fetch(endpoint, {
  method: 'POST',
  headers: headers,
  //http 请求传输只能是字符串  
  body: JSON.stringify(payload)
  // 请求 + LLM 生成需要花时间
  // http请求是基于请求响应的简单协议
  // 返回的是文本或二进制流
}).then(res => res.json())
// 解析返回的json数据 也需要花时间
.then(data => {
  console.log(data);
  document.querySelector('#reply').innerHTML 
    = data.choices[0].message.content 
})
// fetch 是一个用于发起网络请求的JS API，返回一个Promise对象，这个对象在请求完成之后会被解析，解析的值是一个Response对象，该对象包含了服务器的响应信息，如状态码、响应头和响应体等。
//第一个 .then 处理 fetch 请求的响应并将响应体解析为 JSON 格式，
//第二个 .then 处理解析后的 JSON 数据。