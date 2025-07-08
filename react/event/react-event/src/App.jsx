import { useState,useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const handleClick = (e) =>{
    // 事件模块是项目，框架的核心部分，react 性能，封装，优化
    console.log(e)    // SyntheticEvent 合成事件
    console.log(e.target) 
    console.log(e.nativeEvent)  // 原生事件
    // 事件代理  #root + 唯一值 合成事件
    console.log('立即访问'+e.type)
    setTimeout(() => {
      console.log('延迟访问'+e.type)
    }, 2000);
  }
  // react 不能直接操作DOM,性能差
  // js v8 引擎   DOM 渲染引擎
  // react 借鉴了 DOM 0 行内的写法 
  // 相似 react event 并不是原生事件 叫 合成事件（react自己封装的事件）
  return (
    <>
     <button onClick={handleClick}>click</button>
    </>
  )
}

export default App
