import TodoItem from "./TodoItem";
const TodoList = (props) => {
    const {todos} = props
    return (
        <ul className="todo-list">
           {
             todos.length > 0 ? (
                todos.map(todo => (
                    <TodoItem key={todo.id} 
                       todo={todo} />
                ))
            ) : (
                <p>暂无待办事项</p>
             )
           }
          
        </ul>
    );
};
export default TodoList;