# Lowcode Editor

- npx create-vite lowcode-editor --template react-ts

- editor 组件
  - 低代码编辑器 
- tailwindcss 配置
   - 安装 tailwindcss 相关依赖   npm install tailwindcss @tailwindcss/vite
   - 配置 tailwindcss 相关文件

- allotment 组件
   pnpm i allotment 
   allotment 是一个用于在 React 应用中实现可拖拽分割面板（如左右 / 上下可调整大小的布局）的依赖包
   - 左侧：物料面板
   - 中间：编辑区域
   - 右侧：配置面板
- 模块化开发

- zustand 状态管理
   - json 数据，低代码编辑的本质  

## 第一次总结
使用了aisude 阿里低代码编辑器，发现核心是一个json 的数据结构。
一个通过children 属性串联的组件对象树
alloment split pane 布局，用tailwindcss 写样式，zustand 来全局状态管理
数据结构就是树，并不复杂，但是是低代码编辑器的核心

## 阿里的antd 组件库
## 物料区组件
  可扩展的组件库
  - Container 容器组件
  - 
- 编辑区

- 设置区

## 拖拽生成
pnpm i react-dnd react-dnd-html5-backend
react-dnd 是一个用于在 React 应用中实现拖放（Drag and Drop）功能的流行库，通过提供可组合的 API 和后端抽象（如 HTML5 或触摸）来简化复杂拖拽交互的开发。
- 根上包着

## 遇到的问题
- useDrop 的时候会插入多次 
- useDrop 多次重复
   违反了dry 原则 
   应该封装一下