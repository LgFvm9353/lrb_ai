import {useRef} from 'react'
import { useUserStore } from '../../store/userStore'
import { useNavigate } from 'react-router-dom'
const login = () =>{
  const usernameRef = useRef()
  const passwordRef = useRef()
  const navigator = useNavigate()
  const {login} = useUserStore()
  const handleLogin = (e) =>{
    e.preventDefault()
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    if(!username.trim() || !password.trim()){
      return alert('请输入用户名和密码')
    }
    login(username,password)
    setTimeout(()=>{
      navigator('/')
    },1000)
  }
    return (
        <>
          <form onSubmit={handleLogin}>
             <div>
              <label htmlFor='username'></label>
              <input type='text' 
                   ref={usernameRef} 
                   id='username' 
                   required
                   placeholder='请输入用户名' />

             </div>
             <div>
              <label htmlFor='password'></label>
              <input type='password' 
                    ref={passwordRef} 
                    id='password' 
                    required
                    placeholder='请输入密码'/>

             </div>
             <div>
              <button type='submit'>登录</button>
             </div>
          </form>
        </>
    )
}
export default login