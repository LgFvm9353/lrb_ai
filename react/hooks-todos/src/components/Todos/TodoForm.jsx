import {
    useState
} from 'react'
const TodoForm = (props) => {
    const {onAddTodo} = props;
    // 数据
    // props 参数数据
    // state 私有的数据
    // 单向数据流
    const [text,setText] = useState('')
    // JSX 一定得有唯一的最外层元素 树状

    const handleSubmit = (e)=>{
        e.preventDefault()
        let result = text.trim()
        if(!result) return
        onAddTodo(result)
        setText('')

    }
    return (
        <>
            <h1 className='header'>TodoList</h1>
            <form className='todo-list' onSubmit={handleSubmit}>
              <input 
                type="text" 
                value={text}
                // 数据绑定
                onChange={(e)=>setText(e.target.value)} 
                required
                placeholder='请输入代办事项' 
              />
              <button type='submit'>Add</button>
            </form>
        </>
      
    );
};
export default TodoForm;