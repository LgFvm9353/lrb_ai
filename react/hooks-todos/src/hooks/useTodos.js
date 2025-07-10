import { useState,useEffect } from "react";

const useTodos = () => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos') || '[]'))

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
   
    const addTodo = (text) => {
        setTodos(prev => [...prev, {
          id: Date.now(),
          text,
          isCompleted: false
        }]);
      };
    
      const toggleTodo = (id) => {
        setTodos(prev => prev.map(todo => 
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ));
      };
    
      const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      };

      const editTodo = (id, newText) => {
        setTodos(prev => prev.map(todo => todo.id === id ? {...todo, text: newText} : todo))
      }

    return {
        todos, 
        addTodo, 
        toggleTodo, 
        deleteTodo,
        editTodo
     } 
    
}

export default useTodos;