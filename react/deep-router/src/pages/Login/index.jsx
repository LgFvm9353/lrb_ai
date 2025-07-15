import React, { useState } from 'react';
import{useNavigate,useLocation} from'react-router-dom'
const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    
    const handlerSubmit = (e) =>{
        e.preventDefault();
        if(username === 'admin' || password === '123456'){
            localStorage.setItem('isLogin',true);
            navigate(location?.state?.from || '/')
        }else{
            alert('用户名或密码错误');
        }
    }

    return (
        <form onSubmit={handlerSubmit}>
            <input 
               type="text" 
               placeholder="请输入用户名" 
               required
               value={username}
               onChange={(e)=>setUsername(e.target.value)}
               />
            <input 
               type="password" 
               placeholder="请输入密码" 
               required
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               />
            <button type="submit">Login</button>
        </form>
    );
};
export default Login;