# react-router-dom
- 路由？
  - 后端路由
    暴露资源
  - 前端路由
    页面跳转

- react 开头
  react 生态系统的一部分
  - react 
    响应式、状态管理、组件、hook等等核心功能
    - 体积小，功能强悍 避免成为 体积大 笨重
    - 页面慢
    - 少就是多
  - react-router-dom
  - redux/mbox/zustand 

## react 开发全家桶
- react 19  
- react-dom 19 
- react-router-dom  7.6.3

## react 特色
- 全面组件化
  vue 更执着
  react 函数化编程

- 动态路由
  https://juejin.cm/users/123
  协议 域名 路径 ？参数  # 锚点

# restful 国际规范
 url 定义是核心部分
 Method + 资源的描述
  GET /user/:id
  GET /post/:id 
  POST /post
  PUT /post/:id

  PUT（替换） PATCH（局部） 修改
  PUT 上传头像

  DLETE /post/:id 删除
  HEAD /post/:id 查看 查看资源的元信息

- 后端路由  暴露资源
  早期只有后端路由
  server -> http服务 -> 路由（路由） -> 响应html网页  传统的后端驱动的 web 开发方式

  展示下一个页面 再来一个请求
  /
  /about
  - 有点是足够简单
  - 前后端解耦合 后端要写前端的页面
  - 浪费沟通时间
  - 逻辑 数据库 套页面  MVC 开发方式 Model View Controller

  - 不再以返回页面为目的
- 前后端分离 MVVM   Model(fetch api)-View(jsx)-ViewModel(视图模型层，useState,数据绑定JSX) 
  - 前后端联调  api开发文档 ，约定 
  - 前后端分离开发 以API开发文档为约定 
  - 前端当家做主
  - 前端也有了路由
    /user/:id path 页面级别组件
    useState 
    useEffect 
      fetch 后端 api 接口 ，拿到数据
      完成web应用
      PC/Mobile/App/小程序/桌面端 大前端
  - html/css/js react 框架

