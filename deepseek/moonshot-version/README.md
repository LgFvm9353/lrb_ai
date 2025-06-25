# 智能前端之图片识别

- StrictModel react默认启动的严格模式，会对所有的组件进行检查，包括生命周期方法，render方法，setState方法等。
   执行一次，测试一次

- 良好的编程风格
   移除不需要的代码

- import.meta.env 环境变量
  import.meta.env.xxx 可以在代码中获取环境变量的值
  代码运行时可以和环境变量交互
  把env 写道代码里
- async await 异步编程
  异步编程是一种编程方式，它允许程序在等待某个操作完成时继续执行其他操作，而不是阻塞程序的执行。
  异步编程的主要目的是提高程序的性能和响应速度，因为它可以避免程序在等待某个操作完成时被阻塞。
  then
  异步
  流程控制
  await 比 then 更同步化 简单

- class 是js关键字
  -react JSX运行，以原生JS 来运行
  用className 来代替class

- 无障碍访问
  label htmlFor + input#id

- 本地预览 preview
   - 良好且必须的用户体验，实时告诉用户在发生什么
   - 图片上传及处理挺慢的，所以需要preview
   - onChange 
     e.target.files[0] 拿到图片
     - FileReader 读取图片
     - readAsDataURL 读取图片的url
       - data ? base64 格式
       - base64 直接作为 img src
     - onload 
  
- 静态的html -》 动态模板 ({data}) -》 状态 State useState
 