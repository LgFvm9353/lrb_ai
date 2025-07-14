# 路由
- history
- hash

- 传统页面开发
  非常重要的用户体验缺失
  - 需要去到后端服务器拿到新的html，重新渲染
    白屏
  - a 链接切换页面
  - 相比于react-router(局部热更新)，速度慢

- 新的react-router-dom SPA 单页面应用
    只有一个页面，但是能带来多页面效果

## SPA
- Single Page Application
- 只有一个页面
  - react 组件 
     页面级别组件
  - Routes/Route 申明， 在文档流中占位
  - Routes 外面，Outlet 外面 不用更新
  - url 变化，路由变化，组件变化，页面不刷新
  - Route 内部显示那个页面组件
     热更新

  - 用一个页面完成了多个页面的显示
  - SPA 用户体验特别棒

## 核心
- url 切换
    不能用a  a 会默认重新发送请求
    用Link 
    不会重新发送请求，作为一个事件触发，用的是JS 动态加载

- 事件 hashChange / pushState 
- 根据当前的url，取出对应的组件
   替换掉之前的页面级别组件
- 体验是
  url 改变了，不刷新整个页面
  用户不再看白屏，页面展示非常快
  About / Home 等 全是前端组件

## url 改变，但不重新渲染的解决方案
- hash 的改变 （不是html5，很早就有）
    原来是用来做页面锚点的，主要用与做长页面的点击
    不会刷新页面，但是会触发hashChange 事件
    可以用JS 来监听hashChange 事件，来改变页面的内容
    但是hash 改变了，但是页面没有刷新，所以不会触发路由的变化
    所以需要手动触发路由的变化，来改变页面的内容
    #/
    #/about

- 事件 
  hashChange 