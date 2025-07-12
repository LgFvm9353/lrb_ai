# event loop
事件循环机制  js 执行机制

- js 单线程
  同一时刻只能做一件事
  同步任务尽快执行完，渲染页面，响应用户的交互

- script 脚本
  一个宏任务

- 微任务有哪些
  紧急的，同步任务执行完成后的一个不愁
  - promise.then()/catch()/finally()
  - MutationObserver
    dom 改变发生在页面渲染前
  - process.nextTick() nodejs
  - queueMicrotask()

- 宏任务有哪些
  - script
  - setTimeout()
  - setInterval()
  - setImmediate() nodejs
  - requestAnimationFrame()
  - I/O
  - UI rendering
  - 网络请求
  - 其他
