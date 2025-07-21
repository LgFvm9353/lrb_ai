import {  
  useRef,
  useEffect,
  forwardRef
} from 'react'

import './App.css'

function Guang (props,ref){
  console.log(props,ref);
  return (
    <div>
      <input type='text' ref={ref}></input>
    </div>
  )
}
// 返回一个新的组件，具有ref 向下传递的能力
// 高阶组件
const WrapperGuang = forwardRef(Guang)
function App() {
  // 父组件 持有ref 
  const ref = useRef(null);
  console.log(ref.current);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div className="App">
      {/* <input ref={ref} /> */}
      <WrapperGuang ref={ref}/>
    </div>
  )
}

export default App