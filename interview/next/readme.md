- npx create-next-app@latest mt-todo
  基于 create-next-app 创建了my-todo next.js 项目
- npx 
   不用先安装，可以直接运行，适合项目的测试
   不会留下痕迹，不影响全局
   npm i -g create-next-app@latest
   尝试一下某种技术的时候，特别有用


- CSR and SSR
  组件在客户端运行 模板编译，挂载，浏览器(client) SPA
  Next.js 服务器端渲染 SSR组件的编译发生在服务器端，SEO非常友好
  爬虫爬取的是服务器端返回的html,而CSR只有一个 #root
  SSR(服务端渲染)  服务器先渲染好页面，再返回给浏览器

  CSR(浏览器渲染) 浏览器先请求数据，再根据数据渲染页面