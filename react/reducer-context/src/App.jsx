import './App.css'
import { useTodos } from './hooks/useTodos'
import { TodoContext } from './TodoContext'
import  AddTodo  from './components/AddTodo'
import  TodoList  from './components/TodoList'
function App() {

  const todoHook = useTodos()
  return (
    <>
    {/* APP 状态管理 */}
      <TodoContext.Provider value={todoHook} >
        <AddTodo />
        <TodoList />
      </TodoContext.Provider>
    </>
  )
}

export default App
