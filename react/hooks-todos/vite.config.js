import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // vite 工程化工具  node环境下的路径模块
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 配置路径别名  @ 表示src目录
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
