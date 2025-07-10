import { createContext } from 'react';

export const TodoContext = createContext({
//   todos: [],
  toggleTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
//   addTodo: () => {}
});