import '../Todo.css'
import TodoForm from './TodoForm.jsx'
import Todos from './Todos.jsx'
import { useState } from 'react';
// TodoList.jsx 组件的核心代码
function TodoList() {
  // 用 useState 来保存数据
  const [todos, setTodos] = useState([{ id: 1, text: '吃饭', completed: false }]);
  const [title, setTitle] = useState('Todo List');

  // 处理添加待办事项的函数
  const handleAdd = (text) => {
    setTodos([...todos, { id: todos.length + 1, text, completed: false }]);
  };

  // 返回页面的结构
  return (
    <div className="container">
      <h1>{title}</h1>      {/* 直接把 title 变量放在大括号里，页面就会显示它的值 */}
      <TodoForm onAdd={handleAdd} /> {/* 把 handleAdd 函数传给 TodoForm 组件，让它能调用 */}
      <Todos todos={todos} /> {/* 把 todos 数据传给 Todos 组件，让它负责显示 */}
    </div>
  );
}


export default TodoList;