import '../Todo.css'
import TodoForm from './TodoForm.jsx'
import Todos from './Todos.jsx'
function TodoList() {
  return (
    <div className="container">
        <h1 className='title'>Todo List</h1>
        <TodoForm/>
        <Todos/>
    </div>
  );
}

export default TodoList;