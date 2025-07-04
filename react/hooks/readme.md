# react hooks 编程

- useState 状态管理
  - 非常好用的函数式编程
    函数是一等对象（JS）
    函数还是构造函数  
    函数也是组件  return JSX
  - 以 use 开头的函数  都是hook

- useEffect 
  - 副作用

- 生命周期函数 lifecycle 
  - mounter 挂载后  组件渲染完成
    只在渲染完成之后执行，更新后不执行
  - updated 更新后  [] 依赖项
  - 卸载后的副作用  unmounted
    - 定时器等会造成内存泄露的问题 要回收，取消
    - 请求数据  卸载时，响应式数据和DOM 不在了，取消请求
- 组件应该再什么时候去请求接口？
  - 组件的第一事件渲染时最重要的
  - useEffect 去请求接口
    不会和渲染争抢
  - 依赖项为[]
    组件状态发生改变不需要再次请求

- 为什么useEffect 函数不可以直接用async?
  - 再声明一个async 函数
  - 异步函数返回的是promise对象
  - useEffect 函数返回的是一个函数(清理函数机制)  函数可以取消

