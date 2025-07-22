import { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleMock from '../mock/mock';

// 创建 Mock 实例
const mock = new SimpleMock();

// 添加规则
mock.addRule({
  url: '/api/todos',
  method: 'GET',
  delay: 500, // 模拟 500ms 延迟
  response: () => ({
    code: 0,
    message:'success',
    data: [
      { id: 1, title: '学习 Mock 原理', completed: false }
    ]
  })
});

mock.addRule({
  url: '/api/todos',
  method: 'POST',
  response: () => ({
    code: 0,
    message: '添加成功',
  })
});

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
   // 测试 XHR 拦截
   axios.get('/api/todos')
   .then(res => {
     setTodos(res.data.data);
   })
   .catch(err => {
     setError('加载失败：' + err.message);
   });
 
 // 测试 fetch 拦截
 fetch('/api/todos', { 
   method: 'POST',
   headers: { 'Content-Type': 'application/json' }
 })
   .then(res => {
     if (!res.ok) throw new Error('请求失败');
     return res.json();
   })
   .then(data => console.log(data.message)) // 输出 "添加成功"
   .catch(err => console.error('POST 失败：', err));
  }, []);
  
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
export default App;