const express = require('express');
const http = require('http');
const axios = require('axios'); // 用于调用 DeepSeek API
const app = express();
const server = http.createServer(app);

// 配置 DeepSeek API（需替换为你的 API Key）
// 在文件顶部添加
require('dotenv').config({ path: '.env.local' });

// 修改为
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_URL; // 从 DeepSeek 控制台获取
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'; // DeepSeek 聊天接口

// 静态文件托管（前端页面）
app.use(express.static(__dirname));

// 根路径返回前端页面
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

// SSE 流式接口：接收用户问题，调用 DeepSeek 并推送流式结果
app.get('/stream', async (req, res) => {
  const userPrompt = req.query.prompt;
  if (!userPrompt) {
    return res.status(400).send('请输入问题');
  }

  // 设置 SSE 响应头（关键配置）
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*' // 跨域配置（生产环境需限制域名）
  });

  try {
    // 调用 DeepSeek API（流式模式）
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat", // 使用 DeepSeek 聊天模型（其他模型可替换，如 deepseek-vl）
        messages: [
          { role: "user", content: userPrompt } // 用户问题
        ],
        stream: true, // 开启流式输出
        max_tokens: 1024 // 最大生成 tokens
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}` // 身份验证
        },
        responseType: 'stream' // 声明响应为流
      }
    );

    // 监听 DeepSeek 流数据，通过 SSE 推送给前端
    response.data.on('data', (chunk) => {
      // DeepSeek 流式返回格式为：data: { ... }\n\n（需解析）
      const chunkStr = chunk.toString().trim();
      const lines = chunkStr.split('\n');

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const jsonStr = line.slice(5).trim(); // 去除 "data: " 前缀
          if (jsonStr === '[DONE]') {
            // 模型返回结束标识，向前端发送结束信号
            res.write('data: [STREAM_END]\n\n');
            return;
          }
          try {
            // 解析 JSON，提取生成的内容
            const data = JSON.parse(jsonStr);
            const content = data.choices[0]?.delta?.content;
            if (content) {
              // 通过 SSE 推送内容（格式：data: 内容\n\n）
              res.write(`data: ${content}\n\n`);
            }
          } catch (e) {
            console.error('解析 DeepSeek 响应失败：', e);
          }
        }
      }
    });

    // 流结束时关闭响应
    response.data.on('end', () => {
      res.end();
    });

    // 监听客户端断开连接，清理资源
    req.on('close', () => {
      response.data.destroy(); // 终止 DeepSeek 流
      res.end();
    });

  } catch (error) {
    console.error('调用 DeepSeek API 失败：', error.message);
    // 向前端推送错误信息
    res.write(`data: 调用失败：${error.message}\n\n`);
    res.write('data: [STREAM_END]\n\n');
    res.end();
  }
});

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`服务已启动，访问 http://localhost:${PORT} 体验`);
});