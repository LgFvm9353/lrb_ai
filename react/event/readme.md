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

## 事件委托 Event Delegation
- 事件委托
  - 事件绑定在父元素上
  - 事件冒泡
  - 事件对象 e.target 找到被点击的元素
  - 事件处理函数中 做判断
    - 找到被点击的元素 做处理
    - 没找到 不做处理

- 优势 
  - 性能优化 
    - 极致将事件委托给最外层的元素
    react 大型项目开发
    给我们的节点 event.target 添加一个唯一属性 
  - 动态节点的事件
    滚动到底部，一次新增一堆的新元素
    事件委托可以有效解决
  - 同一元素的同一事件注册多次
    - dom 节点
    - event type
    - 监听器（回调函数） event loop 
      event 对象
    - useCapture 
      同一个元素 同一个事件 同一个监听器 同一个 useCapture 只会注册一次
      同一个元素 同一个事件 同一个监听器 不同的 useCapture 会注册多次
      同一个元素 同一个事件 不同的监听器 同一个 useCapture 会注册多次
      同一个元素 同一个事件 不同的监听器 不同的 useCapture 会注册多次

    - event.preventDefault() 阻止默认行为 阻止冒泡
      from submit
      a 跳转
    - event.stopPropagation() 阻止冒泡
    - event.stopImmediatePropagation() 阻止冒泡 阻止同一个元素 同一个事件 同一个监听器 同一个 useCapture 后面的监听器
    - event.immediatePropagationStopped 阻止冒泡 阻止同一个元素 同一个事件 同一个监听器 同一个 useCapture 后面的监听器
    - event.isPropagationStopped() 阻止冒泡 阻止同一个元素 同一个事件 同一个监听器 同一个 useCapture 后面的监听器
    - event.isImmediatePropagationStopped() 阻止冒泡 阻止同一个元素 同一个事件 同一个监听器 同一个 useCapture 后面的监听器

  - 用户交互的便利体验问题
    - toggle 按钮
    - 点击页面任何地方可以关闭