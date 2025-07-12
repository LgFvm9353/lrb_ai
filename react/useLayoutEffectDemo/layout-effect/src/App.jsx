import { 
  useState,
  useEffect,
  useLayoutEffect,
  useRef
 } from 'react'
import './App.css'

// function App() {
//   // 响应式的
//   const boxRef = useRef(null)
//   console.log(boxRef.current,boxRef)
//   useEffect(() => {
//     console.log('useEffect '+boxRef.current.offsetHeight)
//   }, [])
//   useLayoutEffect(() => {
//     console.log('useLayoutEffect '+boxRef.current.offsetHeight)
//   },[])
//   return (
//     <>
//       {/* 内容的高度 */}
//       <div ref={boxRef} style={{height: 100}}></div>
//     </>
//   )
// }
function App(){
   const ref = useRef(null)
  //  useEffect(()=>{
  //    const heightPx = 200; // 明确使用数值
  //  ref.current.style.height = `${heightPx}px`;
  //  ref.current.style.marginTop = `${(window.innerHeight - heightPx) / 2}px`;
  //  },[])

  // 阻塞渲染 同步的感觉
  useLayoutEffect(()=>{
    const heightPx = 200; // 明确使用数值
    ref.current.style.height = `${heightPx}px`;
    ref.current.style.marginTop = `${(window.innerHeight - heightPx) / 2}px`;
  },[])

   return (
    <div ref={ref} style={{height:'50px',background:'lightblue'}}>
      内容
    </div>
   )
}

export default App;