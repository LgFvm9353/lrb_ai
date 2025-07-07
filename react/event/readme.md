# react 事件机制
- js 事件机制
  - 异步
  - 监听一个事件
    - addEventListener
    - DOM 0
    <a onClick="doSomething()"></a>
    - DOM 1 ? DOM 版本 
  
  - addEventListener(type,listener,useCapture)
    - 回调函数 callback 异步处理的称呼
    - promise then
    - async await
    listener 监听器

- useCapture false 默认值
   页面是浏览器渲染引擎按像素点画出来的
  - 捕获阶段 从父元素到子元素  
    从最外层的document -> 一层层去问 找到 event.target
    捕获才能知道 点了谁
  - 冒泡阶段 从子元素到父元素
    从 event.target 冒泡到 html
    事件在冒泡阶段才会触发
    在那个阶段执行？ 
