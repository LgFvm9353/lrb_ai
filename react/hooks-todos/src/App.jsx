import { 
  useState, // react 函数式编程 好用的以use 开头的函数
  useEffect,
} from 'react'
import './App.css'
import Todos from './components/Todos'
import './global.styl'
function App() {
  // 数据流管理
  // 父组件持有管理数据 props 传递数据 子组件通过props 自定义函数通知父组件

 
  return (
    <>
    {/* 开发的任务单位就是组件 */}
    {/* <div style={{ 
      width: '3.5714rem',
      height: '3.5174rem',
      backgroundColor: 'green'
    }}></div> */}
     <Todos />
    </>
  )
}

export default App
