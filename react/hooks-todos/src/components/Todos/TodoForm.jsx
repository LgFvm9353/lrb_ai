import {
    useState
} from 'react'
const TodoForm = (props) => {
    const {onAddTodo} = props;
    // JSX 一定得有唯一的最外层元素 树状
    return (
        <>
            <h1 className='header'>TodoList</h1>
            <form >
              
            </form>
        </>
      
    );
};
export default TodoForm;