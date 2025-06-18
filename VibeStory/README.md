# VibeStory - 关键词驱动的互动小说平台

## 项目介绍
VibeStory 是一个基于关键词驱动的互动小说平台，通过简单的关键词组合，创造出丰富多彩的故事世界。项目使用 DeepSeek API 提供故事生成服务，支持动态剧情生成、角色关系管理和环境反馈系统。

## 功能特点
- **关键词驱动**：只需输入几个关键词，即可生成完整故事
- **互动选择**：在故事的关键节点做出选择，影响故事走向
- **角色关系**：查看角色之间的关系网络
- **故事结构**：了解故事的叙事结构和关键节点
- **记忆碎片**：收集故事中的重要记忆，解锁隐藏内容
- **多设备支持**：响应式设计，适配不同屏幕尺寸

## 使用方法
1. 在设置页面输入关键词（用+连接）
2. 设置游戏参数（难度、风格、背景）
3. 点击"开始故事"按钮
4. 在游戏过程中做出选择，影响故事发展
5. 查看角色关系、故事结构和记忆碎片

## API 配置
项目使用 DeepSeek API 进行故事生成，需要配置以下参数：
```javascript
const API_CONFIG = {
    url: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: 'your-api-key-here',
    maxRetries: 3,
    retryDelay: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-api-key-here'
    }
};
```

## 项目结构
- `index.html` - 主页面
- `script.js` - 游戏逻辑和API调用
- `style.css` - 样式文件

## 运行要求
- 现代浏览器（Chrome、Firefox、Edge等）
- 互联网连接（用于API调用）

## 许可证
MIT License