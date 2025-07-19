# react-repos 项目开发
- api.github.io/users/xxx/repos
- 综合、项目级别、大型的、性能

## 路由设计
  - react-router-demo
  - /repos/:username
  - /repos/:id
  懒加载 + 路由守卫
  useParams
## 数据管理
   App 管理数据
   repos useContext + useReducer + hooks
   createContext + reducer + useRepos
 
## react
   组件的粒度

## api
  fetch 
  - axios http请求库
  - 

## 项目的目录结构,项目架构
  - src
    - apis 应用中的所有的接口
    - main.jsx
      入口文件
      添加路由，SPA
      添加全局应用状态管理

- RepoList  功能模块
   - useParams 动态参数对象
   - 不要放在useEffect里面
   - 校验id  原则：不要相信用户的任何提交
   - navigator('/')  -> useEffect中去

- 组件的开发模式
   - UI组件 (JSX)
   - 自定义hooks
       useRepos 方便
   - 状态管理  应用全局 context 来管
       - repos loading error => context value
       - useReducer reducer 函数
   

    