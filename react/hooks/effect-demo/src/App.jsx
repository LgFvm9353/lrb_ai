import { useState,useEffect } from 'react'
import Timer from './components/Timer'
import './App.css'

function App() {
  // 正作用：渲染组件
  // 渲染完组件之后搞点副作用
  // 生命周期函数  挂载后 mounter

  // 1. 组件挂载
  // 2. 组件更新
  // 3. 组件卸载
  // 4. 组件销毁
 
  const [count,setCount] = useState(0)
  const [num,setNum] = useState(0)
  const [repos,setRepos] = useState([])
  const [isTimeron,setIsTimerOn] = useState(true)
  // 第二个参数是依赖项数组
  useEffect(()=>{
    // setCount(count+1)
    console.log('数据变化了')
  },[count,num])

  // useEffect(()=>{
  //   // api 数据 动态的
  //   console.log('只在组件挂载时运行一次')
  //   const fetchRepos = async () =>{
  //     const response = await fetch('https://api.github.com/users/shunwuyu/repos')
  //     const data = await response.json()
  //     setRepos(data)
  //   }

  //   fetchRepos()
  // },[])
 
  // 组件的模板编译
  // 挂载到 #root 节点上
  return (
    <div>
      {count}
      <button onClick={()=>{
        setCount(count+1)
      }}>点击</button> <br />
      {num}
      <button onClick={()=>{
        setNum(num+1)
      }}>点击</button> <br />
      <br/>
      <ul id="repo">
        {
          repos.map(item=>{
            return <li key={item.id}>{item.full_name}</li>
          })
        }
      </ul>
      {isTimeron && <Timer />}
      <button onClick={()=>{setIsTimerOn(!isTimeron)}}>toggle timer</button>
    </div>
  )
}

export default App
