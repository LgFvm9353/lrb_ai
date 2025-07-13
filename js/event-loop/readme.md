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

## 多进程和多线程
- cpu 轮询
  
- 进程
  分配资源的最小单元
  内存（地址、物理） CPU的计算机会
  独立的进程ID 一定的大小 开销
  程序运行以进程为单位
  - 主进程
    管理子进程 父子关系
  - 子进程
    执行任务 可以创建子进程 并发 并行
    进程间通信
    进程间共享内存

- 线程
  干活的
  进程的一个执行单元
  - 主线程
    执行JS代码
- 进程之间的通信
  两个独立进程之间的通信开销很大
  父子进程相比之下开销好点

- 浏览器是多进程架构
  - 浏览器主进程
  - 一个tab 就是一个渲染进程
    几个tab 几个进程
    安全、一个页面crash 了，别的不受影响
  - 主线程 主角
    js 单线程
    - 简单
    - DOM编程模型 不可以进行线程争抢

- setTimeout 专属定时器线程 
  到时间了，callback 放入宏任务队列
  放到event loop 中 队列中
  放到setTimeout 不准
  放到event loop中
  宏任务 微任务 队列

- addEventListener 没有独立的线程
  DOM 不需要 宏任务队列
- fetch/xhr 专属的下载线程

- 渲染进程的主线程
  - 解析HTML -> 生成DOM树
  - 解析CSS -> 生成CSSOM
  - 合并DOM树和CSSOM -> 生成渲染树
  - 布局 Layout
  - 合并图层
  - v8 引擎 JS 执行
  - 独立的绘制线程

- 事件队列？
  - 定时器到点了
  - onreadystatechange 状态改变了
  - 宏任务队列
  - 微任务队列
 
- 页面渲染

JS 和 渲染 是互斥的

  
  