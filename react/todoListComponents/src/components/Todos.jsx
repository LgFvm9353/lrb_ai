// Todos.jsx 组件，负责显示列表
function Todos(props) {
    const todos = props.todos; // 从 props 里取出 todos 数据
    return (
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    );
  }
  
export default Todos;