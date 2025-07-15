import {Navigate,useLocation,useNavigate} from 'react-router-dom'

// 鉴权组件
const ProtectRoute = (props) =>{
    const {children} = props;
    // 并非子组件 ，props 的children 属性
    // 能够提升定制性 
    const isLogin = localStorage.getItem('isLogin') === 'true';
    const location = useLocation()
    let pathname = location.pathname
    if(!isLogin){
        return <Navigate to='/login' state={{from: pathname}}/>
    }
    return children
    //  return (
    //   <>
    //    {!isLogin ? <Navigate to='/login' state={{from: pathname}}/> : children}
    //   </>
    //  )
}
export default ProtectRoute