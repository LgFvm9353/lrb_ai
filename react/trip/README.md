# react 旅游APP
- 移动APP
- 模仿 App 
   - 喜欢的、国外的 模仿+做出改变
- 包含绝大多数考点
   - 适用于任何App 

## 技术栈
- React 全家桶
   React 组件开发
      组件的封装
      第三方组件
      自定义hooks
   React-Router-Dom
      SPA、懒加载、路由守卫
   Zustand
- axios 请求拦截
- mock 接口模拟
- jwt 权限校验
- module css 
- vite 配置
- 性能优化
   防抖节流
   useMemo useCallback
- css 预处理器 stylus 
   flex transition transform 
- LLM 
   - chat
   - 生图
   - 语言
   - coze 工作流 调用
   - 流式输出
- 移动端适配
   rem 
- 单例模式
  
## 项目架构
- mock
- src
   - api
   - assets
   - components
   - hooks
   - pages
   - router
   - store
   - utils
   - App.jsx

## 开发前的准备
- 安装的包
  pnpm i react-router-dom axios zustand 
  react-vant(UI组件库) 
  lib-flexible(解决移动端适配)
  开发期间的包
  vite-plugin-mock jwt

- vite.config.js
  - alias
  - 配置mock
  - .env.local
  - user-scalable=no
  - 移动端适配  rem
     不能用px 相对单位 rem html 
     不同设备上体验要一致
     不同尺寸手机 等比例缩放
     设计师手稿 750px iphone 4 375pt *2 = 750
     css 一行代码 手机不同尺寸 html font-size 等比例
     flexible.js 阿里提出的解决方案 在任何设备上
     1rem = 屏幕宽度/10 
     layout 
  - css 预处理
     index.css  react 
     App.css   全局通用样式
     module.css  通用样式

- lib-flexible
  阿里开源
  设置html fontSize = window.innerWidth / 10
  css px 宽度 = 手机设备宽度 = 375
  1px = 2发光源
  750px 设计稿（要做到2倍大）
- 设计稿上一个盒子的大小？
  - 1 像素不差的还原设计稿
  - 设计稿中像素单位

## 项目亮点
- 移动端适配 
   - lib-flexible 1rem = 屏幕宽度/10
   - 设计稿 尺寸是iphone 标准尺寸 750px 
   - 前端的职责是还原设计稿
   - 频繁的单位换算
     自动化？ pnpm i -D postcss postcss-pxtorem
     postcss 是css 预编译器，很强大
     vite 会读取 postcss.config.js 将css 文件编译


## git 提交规范
- 项目初始化
## 功能模块
- UI 组件库
   - react-vant 第三方组件库 70%的组件已经有了，不用写
   - 选择一个适合业务的UI组件库
- 配置路由及懒加载
   - 懒加载
   - 路由守卫
   - Layout 组件
     - 嵌套路由Outlet 分组路由配置
     - 网页有几个模板 Layout
        - Route 不加path 对应的路由自由选择
        - tabbar 模板
        - blank 模板
- tabbar 组件
   - react-vant + @react-vant/icons
   - value + onChange 响应式
   - 直接点击连接分享 active 的设置    
- chatbot 模块
   - llm 模块 chat封装
   - 迭代chat,支持任意模型
- search 模块
   - 防抖
   - api 
      GoogleSuggest
   - localStorage 
   - 搜索框
   - 搜索结果
- 瀑布流
  - 小红书等主流App的美容浏览用户体验产品
     两列、图片高度不一致、落差感
     滚动加载更多、图片懒加载
  - 接口 
     /api/images?page=${num}&pageSize=${n}
     唯一id
     高度随机  随机图片
  - images 怎么放到两列中？ MVVM
     数据驱动页面（2列） 根据奇偶分配
  - 加载更多 位于盒子底部的元素 通过使用 IntersectionObserver 
    观察它是否出现在视窗，性能更好，使用了观察者模式
    组件卸载时，直接使用disconnext 释放资源，防止内存泄露
  - key id 下拉刷新
  - 使用IntersectionObserver 实现图片懒加载
- toast组件封装
   - 需要自定义，UI组件库不满足需求 
   - UI props 
   - JS 显示出来 跨层级通信
      观察者 
   - mitt eventBus事件总线 
      - 实例化  mitt()
      - on ('自定义事件的名字',callback)
      - emit('自定义事件的名字',data)
      组件通过监听一个自定义事件，实现基于事件的组件通信
## 项目难点
- 前端智能
   - 封装一个chat 函数
   - 对各家模型比较感兴趣 升级为kimiChat,doubaoChat...  灵活
      性能、能力、性价比
      随意切换大模型，通过参数抽象
   - 文生图
     - 优化prompt 设计
- 原子css 
   - App.css 添加了通用样式
   - 在各自模块里 module.css 不影响别的组件
   - postcss-pxtorem 插件 快速还原设计稿
   - 原子类的css （一个类只负责一个特定的样式属性）
      一个元素按功能逻辑拆分成多个类，和原子一样
      元素的样式就可以由这些原子类组合而成
      样式复用的更好，以后几乎可以不用写样式
- 用户体验
   - 搜索体验  防抖+useMemo 性能优化
   - 组件粒度划分
     React.memo + useCallback 
   - 懒加载
   - 热门推荐 + 相关商品（产品）
   - SPA 
   - Skeleton 骨架屏
      不用让用户等待了
   - 文件上传的preview
      用的html5的 FileReader()
- 自定义hooks
   - useTitle 设置标题，一定要设置

- es6 特性使用
   tabbar 的高亮
   - arr.findIndex
   - arr.startWith
   - promise
   瀑布流随机数据生成
   - Array.from({ length: pageSize }, (_, index) => {...}) 
- 项目迭代
   - 功能由浅入深
   - chatbot deepseek 简单chat
   - deepseek-r1 推理模型
   - 流式输出
   - 上下文
   - coze 工作流接口调用
- 智能生成图片
  - 产品
    冰球社群的宠物
    coze 工作流 智能编排AI流程 编程的一种
  - 设计工作流
    - 创建工作流 ani_pic
        上传宠物照片，生成宠物冰球运动员照片
    - 代码节点
       参数校验和逻辑功能，返回运行的结果
    - 图片生成流程
       - 图片理解插件   计算机视觉
       - 大模型 特征提取 
         prompt
    - workflow_id   7533134865484300303
    - token 
    - coze 图片要先上传到coze空间中，拿到返回的图片url
       uploadUrl + token + new FormData().append(file) 
       拿到file_id
    - workflow_id + workflowUrl + token 
       工作流需要的参数 调用工作流
- 语音输入发表文章
   - 字节tts
   - onMouseDown 
   - BOM html5
   window.navigator.mediaDevices.getUserMedia({
      audio:true
   })
   一定要获取授权，因为这是用户的隐私
## 通用组件开发
- Loading 
  - 居中方案
     position: fixed + tlrb + margin:auto
  - React.memo 无状态组件不重新渲染
  - animation 

## 项目中遇到过什么问题，怎么解决的
- chat message 遇到message覆盖问题
- 闭包陷阱问题
   一次事件里面，两次setMessages()
- 升级瀑布流？
   - 骨架屏
   - 奇偶 两列分配图片的方式可以会像天残脚一样
     两个响应式数组，判断那一列高度更小，将新得到的图片放到这个数组中
   - intersectionObserver 用了两次 重复 违反了dry原则
     封装为hooks 

- AI功能
   智能前端(http 请求) + 工作流 coze api + ai 全新工作链路
   + 自动化Agent 智能体