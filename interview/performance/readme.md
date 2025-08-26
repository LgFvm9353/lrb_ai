# 性能优化

## 重绘重排

- 重绘 
  当元素样式改变但不影响布局时，浏览器重新绘制元素的过程。如改变背景、颜色等

- 重排
  DOM 元素尺寸、位置发生改变时，浏览器需要重新计算布局，影响其他元素位置

  重排一定会触发重绘（性能开销更大），重绘不一定会触发重排

## DEMO 1 批量修改DOM
```js
const el = document.getElementById('myEl')
// 多此操作可能触发多次重排重绘
// 虽然现代浏览器会批量更新处理（合并修改），优化，但是可以避免
el.style.width='100px'
el.style.height='100px'
el.style.backgroundColor='red'
el.style.margin='10px'

// 批量修改class
el.className='newClass' //用类名而不是一堆js代码
el.style.cssText='width:100px;height:100px;backgroundColor:red;margin:10px'
```
### 使用文档碎片
```js
const frag = document.createDocumentFragment()
for(let i=0;i<100;i++){
  const el = document.createElement('div')
  el.style.width='100px'
  el.style.height='100px'
  el.style.backgroundColor='red'
  el.style.margin='10px'
  frag.appendChild(el)
}
// 一次插入文档
document.body.appendChild(frag)
```
### 脱离文档流进行操作  下线
```js
const el = document.getElementById('myEl')
// 脱离文档流
el.style.position='absolute'
el.style.display='none'
// 进行大量的DOM操作

// 操作完成后，再插入文档
el.style.position='static'
el.style.display='block'
```

### 缓存布局信息
```js
// offset 读取，但是每次都会触发重排以获取盒子的布局信息
for(let i=0;i<10;i++)
{
    el.style.top = el.offsetTop + 10 + 'px'
}
// 缓存布局信息
const top = el.offsetTop
for(let i=0;i<10;i++)
{
    el.style.top = top + i * 10 + 'px'
}
```

### 使用transform 代替位置调整
```js
el.style.left='100px'

// 位置调整使用transform 代替
// 只触发重绘，性能更好
el.style.transform='translate(100px)'
```

## 资源加载优化

- 懒加载 
  - 图片懒加载
  - 路由懒加载  代码文件上，code splitting 代码分割
  - 组件懒加载
- 资源预加载
  使用 `<link rel="prefetch/preload" href=''>` 预加载资源，提前请求资源，减少等待时间。
  preload 加载的是关键资源，现在就有可能用到的，优先级极高，页面加载初级就开始下载并立即执行/解析
  prefetch 加载的是未来资源，可能在未来用到的，优先级较低，页面空闲时开始加载（onload后），只下载不执行，存入浏览器缓存
- 合并资源
  合并多个 CSS 或 JavaScript 文件为一个，减少 HTTP 请求次数。
- 压缩资源
  压缩 CSS 和 JavaScript 文件，减少文件大小。
- 异步加载
  使用异步加载技术，如 `defer` 和 `async` 属性，避免阻塞页面加载。
  共同点： script.js 与html 并行下载，互不阻塞
  不同点：
  - defer 延迟执行，html 解析完成后按顺序执行所有defer脚本
  - async 异步执行，下载完成后立即执行，执行时html 可能还没有解析完成
- 缓存资源
  使用缓存策略，如 `Cache-Control` 和 `ETag`，避免重复请求资源。
- 图片优化
  压缩图片文件，减少图片大小。webp 格式图片
- 图标字体库  较少http请求，体积小，加载快
## JS执行优化
- 防抖
- 节流
- Web Worker 处理复杂计算
- requestAnimationFrame 优化动画
- requestIdleCallback  react fiber 机制
   schedule 机制

## 框架层优化
- memo 缓存组件
- useCallback 缓存函数
- useMemo 缓存计算结果
- shadcn-ui 组件库  基于tailwindcss 样式，按需加载组件库，减少代码量，提高开发效率
- 合理使用key 优化渲染列表

## 缓存策略
- 浏览器缓存 强缓存/协商缓存
- localStorage / sessionStorage / cookie

## 网络优化
- CDN 加速 
   静态资源，如图片、字体、js、css 等，部署在多个服务器上，根据用户位置，选择距离最近的服务器，减少网络延迟，提高加载速度。  分流，会缓存文件
   多路复用 多域名服务器 img1.baidu.com 
- Gzip压缩
- HTTP 2.0  多路复用
- DNS 预解析

## 首屏优化
- SSR 服务端渲染
  服务端渲染，将页面的渲染工作放在服务端完成，返回给客户端的是已经渲染好的 HTML 内容。
- 骨架屏 
  骨架屏，在页面加载时，先展示一个简单的骨架，等页面资源加载完成后，再替换为真实的内容。
- http 2.0 服务端推送
  服务端推送，在页面加载时，先请求一个 HTML 文件，服务端会根据 HTML 文件中的资源依赖，提前推送这些资源到客户端，减少等待时间。

## 性能测试
- 性能测试工具
  - 浏览器开发者工具 chrome的performance面板
  - 第三方工具 如 google lighthouse
- 性能指标
  - 加载时间
  - 渲染时间
  - 内存占用
  - 网络请求次数
  - 页面大小

- 减少首屏JS/css 体积（code spliting）
代码分割（Code Splitting）是一种将代码库拆分成更小、更易管理的块的技术，以便按需加载或并行加载，从而优化应用的加载性能和执行效率。

- 使用transform 代替位置调整，预加载相关资源
 juejin js = (vue + vue-router) + App.vue + Home.vue + Components
 vue + vue-router 单独拆分，为了更好地利用强缓存，这两个基本是不会变的
 App.vue + Home.vue + Components 业务代码 经常改

- lighthouse
 是chrome 的一款性能打分插件，会在性能、无障碍、最佳实践、SEO打分并给出问题和性能优化建议，非常细致。
 - 图片大小优化  webp
 - 字体库
 - 渲染屏蔽请求

## 性能的关键指标
- FCP First Contentful Paint  首次内容绘制
   首内容绘制（First Contentful Paint, FCP）是衡量网页加载性能的指标，表示浏览器首次渲染出页面内容（如文本、图片等）的时间。
- LCP Largest Contentful Paint  最大内容绘制
   最大内容绘制（Largest Contentful Paint, LCP）是衡量网页加载性能的关键指标，表示页面中最大可见内容元素（如图片、视频或文本块）完全渲染完成的时间。