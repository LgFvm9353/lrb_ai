import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // vite 工程化工具  node环境下的路径模块
// 服务器端 mock 
// vite 前端模拟服务器 准备好了插件
// 前后端分离 不能等后端接口写好了，前端先模拟数据
// 
import {
  viteMockServe
} from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock',
      enable: true
    })
  ],

  resolve: {
    // 配置路径别名  @ 表示src目录
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
