# useLayoutEffect

- useEffect
  副作用
  - 当渲染完成之后 在绘制后异步执行
  - 更新
  - 移除

- useLayoutEffect
  - 副作用
  - 在浏览器DOM更新之后，屏幕绘制之前执行
  - 会阻塞页面的渲染

- 能解决什么问题？
  防”闪烁“ 用户体验，useState 会异步更新，但是在useLayoutEffect 中拿到的是同步的状态
  类似‘同步’拿到响应式之后元素的样式