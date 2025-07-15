# deep router

- router 
- 401
- 301 / 302 重定向
- 404
- 性能优化

- SPA 带来了优质的用户体验
  - 块
  - 不会白屏，不依赖于 http 去服务端请求页面

- 前端首先加路由,SPA 应用
  React 
  ReactRouter
  Redux

- 导航，封装
- 路由懒加载
  lazyload
  - / home 
  只加载当前需要什么
  首页优化
- es6 module 引入模块并且会执行
  
- 懒加载的流程
  - import es6 加载并执行太多的非必要组件
     影响首页的加载速度，特别是页面多的时候
  -  使用React.lazy() 动态导入组件
     lazy 高阶组件（参数可以是一个组件，返回值是一个组件） 
     const Home = lazy(() => import('./Home'));  动态加载
  -  用Suspense 包裹懒加载组件
     <Suspense fallback={<div>Loading...</div>}><Suspense />
     fallback 可以是一个组件，也可以是一个函数，返回一个组件
     当组件加载时，会显示fallback 组件
     当组件加载完成后，会显示组件
  - Webpack 自动代码分割
    - 懒加载的组件会被自动打包成单独的chunk文件
    - 只有当路由匹配时才会加载对应组件

