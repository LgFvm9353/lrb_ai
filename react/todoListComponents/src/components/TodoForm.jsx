import { useState } from "react";
function TodoForm(props){
    const onAdd = props.onAdd;
    const [text,setText] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault(); 
       onAdd(text)
    }
   const handleChange= (e) =>{
        setText(e.target.value)
    }
    return (
        <form action = 'http://www.baidu.com' onSubmit={handleSubmit} onChange={handleChange}>
            <input type="text" placeholder="请输入代办事项" value={text}/>
            <button type="submit">添加</button>
        </form>
    )
}
export default TodoForm;