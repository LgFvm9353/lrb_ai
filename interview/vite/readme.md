# Vite

- 哪些问题？ 工程一揽子方案
  - web server  5173端口   就是 http 模块？ express 框架
     index.html 首页
  - tsx -> jsx -> babel -> js
  - styl -> css 文件
  ...
  工程化工具做的是基础，后方工作

- 怎么介绍vite
   <script type="module" src='/src/main.jsx'>

   VITE是一个基于原生ES Module的开发服务器（webpack，浏览器还不支持模块化），它的核心思想是利用浏览器的原生ES Module支持，实现快速的模块加载（按需编译）和热更新。
   main.jsx 入口文件，模块的依赖
   main.jsx -> App.jsx -> App.css + react + 组件
   整理这些模块之间的依赖关系（链条）

   - 快？
    - 基于原生ES模块，不需要打包所有文件，按需加载
   
   - 兼容性问题
    IE 11 一下不支持

- webpack 
   由于要支持老旧浏览器，不使用esm，要打包
   a->b->c->d
   不用模块化
   d 编译 js  最上面
   c 编译 放在 d 下面 
   b 编译 放在 c 下面
   a 编译 放在 b 下面
   把这些文件打个包，成为一个文件

## webpack和vite 的区别
- index.html 没有type='module' 怕浏览器不支持esm
  整理依赖关系，打包文件，慢
- 适合大型项目
   - entry ,output 这是核心
   - plugins 
      html-webpackplugin html template 在哪？
   - devServer
      http server 细节
   web bundler 一切皆可打包
   vite kuai，不需要打包，但是有兼容性，生态、定制性不如webpack
   webpack 打包，慢一点，但是兼容性好，生态丰富，可为大型项目定制，有很长时间的业务验证
