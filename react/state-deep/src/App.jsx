import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const handleClick = ()=>{
    // 异步执行
    // react 会合并多次setState ，只执行一次 性能优化 
    // 重绘重排
    // 数据绑定 页面绑定
    // JS 引擎 v8
    setCount(count+1)
  }
  return (
    <>
     <p>当前计数：{count}</p>
     <button onClick={handleClick}>
        +1
     </button>
    </>
  )
}

export default App
