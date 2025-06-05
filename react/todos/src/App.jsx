import { useState } from 'react'
import './App.css'
// todos 列表需要渲染
// 函数组件 App组件 组合其他的组件完成应用
//返回html 的函数
// html,css,js 用函数组合在一起就是组件
function App() {
  //react比vue更纯粹
  const todos = ['吃饭','睡觉','打豆豆'] //数据
  return (
    <>
     <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>任务</th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map((item, index) => (
              <tr key={item}>
                <td>{index + 1}</td>
                <td>{item}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

function App2(){
   //数据 =》 数据状态  数据业务 改变的 数据状态
   let [todos,setTodos] = useState(['吃饭','睡觉','打豆豆']) //数据
   let[title,setTitle] = useState('拿下字节')
   setTimeout(()=>{
    todos = ['吃饭','睡觉','打豆豆','养鱼']
    setTodos(todos)
    setTitle('拿下字节')
   },3000)
  return (
    <div>
      <h1 className='title'>拿下字节</h1>
    </div>
  )
}
export default App
export {
  App2
}
