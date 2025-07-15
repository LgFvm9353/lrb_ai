import { useState,useReducer } from 'react'
import './App.css'

// function App() {

//   return (
//     <>
//     <LoginContext.Provider>
//         <ThemeContext.Provider>
//           <TodoContext.Provider>
//             <Layout>
//               <Header />
//               <Main />
//               <Footer />
//             </Layout>
//           </TodoContext.Provider>
//         </ThemeContext.Provider>
//       </LoginContext.Provider>
//     </>
//   )
// }

// 可以管理多个状态
const initialState = {
  count:0,
  isLogin:false,
  theme:'light'
}
// 管理 分部门
// 纯函数 返回一个可靠的状态
// 状态生产器
const reducer = (state,action) => {
  switch(action.type){
    case 'increment':
      return {
        count:state.count + 1
      }
    case 'decrement':
      return {
        count:state.count - 1
      }
    case 'incrementByNum':
      return {
        count:state.count + action.payload
      }
    case 'decrementByNum':
      return {
        count:state.count - action.payload
      }
    default:
      return state
  }
}
function App(){
  // 初始值 initialValue
  // 当前的状态值  旧状态 新状态
  // 界面由当前状态来驱动
  // 修改状态的方法
  // 响应式
  // const [count,setCount] = useState(0)
  // 适合大型项目，小项目不要用
  // dispatch 派发函数
  // 参数固定 对象{type: ''}  action_type
  const [state,dispatch] = useReducer(reducer,initialState)
  

  return (
    <>
      Count: {state.count}
      {/* type 描述发生了什么变化， payload 携带变化所需数据 */}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'incrementByNum',payload: 5})}>+5</button>
      <button onClick={() => dispatch({type: 'decrementByNum',payload: 10})}>-10</button>
    </>
  )
}
export default App
