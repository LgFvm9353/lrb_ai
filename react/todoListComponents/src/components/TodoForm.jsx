import { useState } from "react";
// TodoForm.jsx 组件，处理用户输入
function TodoForm(props) {
    const [text, setText] = useState(''); // 保存输入框的内容
  
    // 表单提交时的处理函数
    const handleSubmit = (e) => {
      e.preventDefault(); 
      props.onAdd(text); 
      setText(''); 
    };
    
    const handleChange = (e) => {
        setText(e.target.value)
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="请输入代办事项" 
          value={text} 
          onChange={handleChange} 
        />
        <button type="submit">添加</button>
      </form>
    );
  }
  
export default TodoForm;