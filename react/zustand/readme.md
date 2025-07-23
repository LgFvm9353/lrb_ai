# 全家同开发之 zustand 状态管理

- 现代前端开发模式
  - UI + 全局应用状态管理
- 轻巧，hooks化得状态管理库
  - cont 响应式状态
  - 全局应用管理
    useContext + useReducer + React.createContext
  - redux/zustand 简化


- 小项目 store 没必要
- 重大型项目 router store 配上
   react-router-dom
   zustand 
   全部用状态管理 UI 组件
   组件状态 

当你在组件中调用useStore时，背后发生了这些事情：

- 创建订阅：组件通过选择器函数订阅store的部分状态
- 状态比对：当store状态变化时，Zustand会：
   - 执行所有选择器函数
   - 使用Object.is比较新旧结果
   - 只有当结果真正变化时才触发重新渲染
- 清理订阅：组件卸载时自动取消订阅