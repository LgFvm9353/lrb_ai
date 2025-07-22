import { 
  useState ,
  useEffect,
  useCallback, // 缓存一个函数
  useMemo  // 缓存一个负责计算的值
} from 'react'
import './App.css'
import Button from './components/Button.jsx'
function App() {
  let a = 0
  const result = useMemo(() => {
    for(let i = 0; i < 1000000000; i++) {
      if(i === 999999999) {
        a = i * 2
      }
    }
    return a // 添加return语句返回计算结果
  }, [])
  console.log(result)
  const [count,setCount]=useState(0)
  console.log(count)
  // render 重新生成
  // 不要重新生成，和useEffect [] 一样
  const handleClick=useCallback(()=>{
    console.log("Button clicked")
  },[])
  return (
    <>
     <div>{count}</div>
     <button onClick={()=>setCount(count+1)}>+</button>
     <Button onClick={handleClick}>Click me</Button>
    </>
  )
}

export default App
