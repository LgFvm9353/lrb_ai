import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useState } from 'react'
const Todos = () => {
    const [todos,setTodos] = useState([
        {
          id: 1,
          title: '学习react',
          isCompleted: false,
        },
        {
          id: 2,
          title: '学习vue',
          isCompleted: false,
        },
      ])

      const addTodo = (todo) => {
        setTodos([...todos,todo])
      }
     return (
        <div className="app">
           {/* 自定义事件 */}
           <TodoForm onAddTodo={addTodo}/>
           <TodoList todos={todos}/>
        </div>
     )
}

export default Todos

