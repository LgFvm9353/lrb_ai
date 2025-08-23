# mcp

- function call
   可以让LLM 突破自身知识和能力的局限，通过调用外部工具或API来获取实时信息、执行计算或操作，从而获取最新数据精确计算与外部系统交互的复杂任务
   - 调用外部工具
   - 调用外部API

- mcp Model Context Protocol
   是一个协议，类似于web开发的 Restful 协议，如何将外部资源暴露给LLM的协议和编程风格 
   是Function Call 的升级版

   在做各种Function Call 有点乱的时候，mcp 统一了一切


   mcp是大模型与外界之间的通信协议，它就好像USB,LLM训练完后的不了解的知识

   LLM 不知道怎么调用地图、数据库、搜索引擎，MCP规定了标准的上下文交换方式，让大模型像调用API一样去访问外部能力

## 举例
  高德地图MCP，请帮我规划公司到机场的路线。
  模型根据高德地图MCP插件，获取实时路径和交通数据

## 意义
- LLM 输入更可靠
- 降低集成成本（自由系统和LLM集成）
- 数据安全可控
高德地图接入MCP,像LLM的眼睛和耳朵，让AI真正理解和使用实时世界

- 安装mcp 客户端
- 高德地图的apikey


## mcp 的使用
- mcp server 是基于mcp协议的服务器软件
   可以定义tool
- LLM
- mcp client 是基于mcp协议的客户端软件 cline/cursor
   配置mcp server
   可以调用mcp server 定义的tool
- LLM -> client -> server transport 通信


