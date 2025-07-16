import { useTodoContext } from "../hooks/useTodoContext"

const TodoList = () => {
    const {
        todos,
        removeTodo,
        toggleTodo
    } = useTodoContext()
   return (
      <>
      {
        todos.map(todo=>{
            return (
                <div key={todo.id}>
                    <span
                       onClick={()=>toggleTodo(todo.id)}
                       style={{textDecoration: todo.done?'line-through':'none'}}>
                        {todo.text}
                    </span>
                    <button onClick={() => removeTodo(todo.id)}>Remove</button>
                </div>
            )
        })
      }
      </>
   )
}

export default TodoList