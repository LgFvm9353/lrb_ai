## React 组件化

- vite 何为？
nmp 包管理
   vite 工程化套件 
   - 大型项目
   - 模板代码
   - 跑起来

- 何为组件
  组合了 html,css,js 的开发单元
  App.jsx 根组件
  - 标签粒度太细，只是工作的一个环节，不利于表达业务单元的抽象
  - TodoList 组件 
  - 工作单位
  - 功能单位
- 组件如何划分 以todoList为例

- 函数就是组件
  - return html 完成了模板 {数据}
  - return 之前 js 逻辑 数据......
  - 复用 
  - 以html 标签的形式 ，插入页面

## 开发目录
   - todoListComponents 项目目录
   - src 开发目录
    - App.jsx 根组件
    - index.jsx 入口文件
    - index.css 样式文件
    - 组件放到components目录下
    - TodoList.jsx 组件文件

## 模块化
  - 大型多人协作的项目
  - 模块化文件分离
     - 函数
     - 类
     - 文件分离 一个文件一个模块（类，函数，组件）
     - import XXX from 'xxx'
        - export default XXX

## 组件化思想
- 现代前端开发框架的核心思想
- 低级的DOM树编程 -》 组件树编程
- 开发的最小单元
    html 只是沙子
    组件才是任务单元
- 组件组合一堆的html,css,js 实现一个组合功能
    方便复用
- 组件组合在一起，完成页面开发
    页面由组件构成，现代前端其实就是用组件搭乐高积木
  
  
