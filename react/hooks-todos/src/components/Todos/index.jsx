import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useState } from 'react'
const Todos = () => {
    const [todos,setTodos] = useState([
        {
          id: 1,
          text: '学习react',
          isCompleted: false,
        },
        {
          id: 2,
          text: '学习vue',
          isCompleted: false,
        },
      ])

      const onToggle = (id)=>{
        // todos 数组找到id 为id isCompleted = !isCompleted
        // 响应式 ？ 返回一个新的数组
          setTodos(todos.map(todo=>{
             return todo.id === id 
             ? {...todo,isCompleted:!todo.isCompleted}
             : todo
          }))
      }
      const addTodo = (todo) => {
        setTodos([...todos,
          {
            id: Date.now(),
            text: todo,
            isCompleted: false
          }
        ])
      }
      const onDelete = (id) =>{
        setTodos(todos.filter(todo =>todo.id !== id ))
      }
     return (
        <div className="app">
           {/* 自定义事件 */}
           <TodoForm onAddTodo={addTodo}/>
           <TodoList 
              todos={todos} 
              onToggle={onToggle} 
              onDelete={onDelete}/>
        </div>
     )
}

export default Todos

