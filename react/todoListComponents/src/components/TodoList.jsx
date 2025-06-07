// 内置的hook 函数
import { useState,useEffect } from 'react';
import '../Todo.css'
import TodoForm from './TodoForm.jsx'
import Todos from './Todos.jsx'
function TodoList() {
    // 数据驱动的界面 
    // 静态页面？
    // DOM 编程 数据 -》 map -》 join('') -》 innerHtml
    // 缺点：低效，面向API
    // 面向业务 懂业务  数据 -》 变化 -》 数据状态 -》自动刷新界面 -》 数据驱动页面 
    // useState 数组 第一项是数据变量，第二项是函数 执行，并传入新的todos
    // 页面会自动更新
    // 挂载点
    // {todos.map}
    // setTodos DOM 动态更新
    // 响应式界面开发
    // hi: 数据状态 ，setHi:修改hi状态的方法  es6的解构
    const [hi,setHi] = useState('haha')
    const [title,setTitle] = useState('Todo List');
    const[todos,setTodos] = useState([
        {
            id:1,
            text:'吃饭',
            completed:false
        }
    ]);
    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         setTodos([...todos, {id: Date.now(), text:'睡觉', completed:false}]);
    //     }, 3000);

    //     return () => {
    //         // 使用 clearTimeout 清除定时器
    //         clearTimeout(timeoutId);
    //     };
    // }, []);
    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         setTitle('Todo List 2');
    //     }, 3000);

    //     return () => {
    //         clearTimeout(timeoutId);
    //     };
    // }, []);
    const handelAdd = (text) =>{ 
        setTodos([...todos,{id:todos.length+1,text,completed:false}]) 
    }
    return (
        <div className="container">
            <h1 className='title'>{title}</h1>
            {/* 表单 */}
            <TodoForm onAdd={handelAdd}/>
            {/* 列表 */}
            <Todos todos={todos}/>
            {   // 当下这个位置
                // 数据为王 界面是被驱动的
                // 数据驱动
                // 数据的绑定  data bounding
                // 发生改变后 自动的绑定
                // 箭头函数使用 (),() 内的表达式会被直接做为函数的返回值，适用于函数体只有一个表达式的场景，并可省略return关键字。
                // todos.map(todo=>(
                //     <li>{todo.text}</li>
                // ))
            }
        </div>
    );
}

export default TodoList;