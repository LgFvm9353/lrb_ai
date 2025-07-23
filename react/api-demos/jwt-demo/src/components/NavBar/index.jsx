import { Link } from "react-router-dom"
import { useUserStore } from "../../store/userStore"
const Navbar = () =>{
    const {user,isLogin,loginOut} = useUserStore()
    console.log(user,isLogin)
    return (
        <nav style={{padding:10,borderBottom:'1px solid #ccc'}}>
            <Link to="/">Home</Link>&nbsp;&nbsp;
            <Link to="/pay">Pay</Link>&nbsp;&nbsp;
            {
                isLogin?
                
                <button onClick={loginOut}>退出</button>
                :<Link to="/login">Login</Link>
            }
        </nav>
    )
}
export default Navbar