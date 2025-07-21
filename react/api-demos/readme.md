# 全栈开发
## 表演型项目
- 前端 react
- mockjs 前端伪接口
   /api axios
- 后端 java/node/go


## vite-plugin-mock
  - mock
  前端在后端给出真实接口前，先模拟数据（mock一下），
  - vite-plugin-mock 插件
  - vite.config.js 配置文件
  - mock 服务启动
  - /mock/test.js 根目录下
    export default [{
      url: '/api/test',
      method: 'get',
      response: () => {
        return {
          code: 0,
          message: 'success',
          data: { name: 'mock' }
        }
      }
    }]

- 前后端联调
   - 开会立项
   - 前后端 接口文档
   /api/todos
   [
    {
        id: 1,
        title: 'todo1',
        completed: false
    }
   ]

 