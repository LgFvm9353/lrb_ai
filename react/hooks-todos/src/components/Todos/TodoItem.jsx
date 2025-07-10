import { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";

const TodoItem = (props) => {
  const { id, text, isCompleted } = props.todo;
  const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    editTodo(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input 
        type="checkbox" 
        checked={isCompleted} 
        onChange={() => toggleTodo(id)}
      />
      {isEditing ? (
        <input 
          type="text" 
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <span 
          className={isCompleted ? 'completed' : ''}
          onDoubleClick={() => setIsEditing(true)}
        >
          {text}
        </span>
      )}
      <button onClick={() => deleteTodo(id)}>Delete</button>
    </div>
  );
};

export default TodoItem;