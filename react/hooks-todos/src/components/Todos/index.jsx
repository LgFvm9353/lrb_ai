import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useState,useEffect } from 'react'
import useTodos from "@/hooks/useTodos"
import { TodoContext } from "./TodoContext"
const Todos = () => {
    // const [todos,setTodos] = useState(JSON.parse(localStorage.getItem('todos') || [
    //     {
    //       id: 1,
    //       text: '学习react',
    //       isCompleted: false,
    //     },
    //     {
    //       id: 2,
    //       text: '学习vue',
    //       isCompleted: false,
    //     },
    //   ]))
    
    //   const onToggle = (id)=>{
    //     // todos 数组找到id 为id isCompleted = !isCompleted
    //     // 响应式 ？ 返回一个新的数组
    //       setTodos(preTodo =>preTodo.map(todo=>{
    //          return todo.id === id 
    //          ? {...todo,isCompleted:!todo.isCompleted}
    //          : todo
    //       }))
    //   }
    //   const addTodo = (todo) => {
    //     setTodos(preTodo=>[...preTodo,
    //       {
    //         id: Date.now(),
    //         text: todo,
    //         isCompleted: false
    //       }
    //     ])
    //   }
    //   const onDelete = (id) =>{
    //     setTodos(preTodo => preTodo.filter(todo =>todo.id !== id ))
    //   }

    //   useEffect(()=>{
    //     localStorage.setItem('todos',JSON.stringify(todos))
    //  },[todos])
    //  return (
    //     <div className="app">
    //        {/* 自定义事件 */}
    //        <TodoForm onAddTodo={addTodo}/>
    //        <TodoList 
    //           todos={todos} 
    //           onToggle={onToggle} 
    //           onDelete={onDelete}/>
    //     </div>
    //  )
    const { 
      todos, 
      addTodo, 
      toggleTodo, 
      deleteTodo,
      editTodo
    } = useTodos();

    return (
      <TodoContext.Provider value={{toggleTodo,deleteTodo,editTodo}}>
        <div className="app">
            <TodoForm onAddTodo={addTodo} />
            <TodoList todos={todos}  />
        </div>
      </TodoContext.Provider>
      
    );

}

export default Todos

