# react 旅游APP
- 移动APP
- 模仿 App 
   - 喜欢的、国外的 模仿+做出改变
- 包含绝大多数考点
   - 适用于任何App 

## 技术栈
- React 全家桶
   React 组件开发
      组件的封装
      第三方组件
      自定义hooks
   React-Router-Dom
      SPA、懒加载、路由守卫
   Zustand
- axios 请求拦截
- mock 接口模拟
- jwt 权限校验
- module css 
- vite 配置
- 性能优化
   防抖节流
   useMemo useCallback
- css 预处理器 stylus 
   flex transition transform 
- LLM 
   - chat
   - 生图
   - 语言
   - coze 工作流 调用
   - 流式输出
- 移动端适配
   rem 
- 单例模式
  
## 项目架构
- mock
- src
   - api
   - assets
   - components
   - hooks
   - pages
   - router
   - store
   - utils
   - App.jsx

## 开发前的准备
- 安装的包
  pnpm i react-router-dom axios zustand 
  react-vant(UI组件库) 
  lib-flexible(解决移动端适配)
  开发期间的包
  vite-plugin-mock jwt

- vite.config.js
  - alias
  - 配置mock
  - .env.local
  - user-scalable=no
  - 移动端适配  rem
     不能用px 相对单位 rem html 
     不同设备上体验要一致
     不同尺寸手机 等比例缩放
     设计师手稿 750px iphone 4 375pt *2 = 750
     css 一行代码 手机不同尺寸 html font-size 等比例
     flexible.js 阿里提出的解决方案 在任何设备上
     1rem = 屏幕宽度/10 
     layout 
  - css 预处理
     index.css  react 
     App.css   全局通用样式
     module.css  通用样式

- lib-flexible
  阿里开源
  设置html fontSize = window.innerWidth / 10
  css px 宽度 = 手机设备宽度 = 375
  1px = 2发光源
  750px 设计稿（要做到2倍大）
- 设计稿上一个盒子的大小？
  - 1 像素不差的还原设计稿
  - 设计稿中像素单位

## 项目亮点
- 移动端适配 
   - lib-flexible 1rem = 屏幕宽度/10
   - 设计稿 尺寸是iphone 标准尺寸 750px 
   - 前端的职责是还原设计稿
   - 频繁的单位换算
     自动化？ pnpm i -D postcss postcss-pxtorem
