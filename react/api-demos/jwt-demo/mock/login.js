// login 模块 mock
import pkg from 'jsonwebtoken';
const { sign } = pkg;
// 安全性 编码的时候加密
// 解码的时候用于解密
const secret = '!&5d646hcode';
export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: (req,res) => {
      const { username, password } = req.body;
      if(username !== 'admin' || password !== '123456') {
        return{
          code: 1,
          message:'用户名或密码错误',
          data: null
        }
      }
      const token = sign(
        {
          user: {
            id: "001",
            username: "admin"
          }
        },
        secret,          
        { expiresIn: '1h' }  
      );
      return {
        code: 0,
        message: 'success',
        data: {  // 添加data层保持一致性
          token: token,
          userInfo: {
            id: "001",
            username: "admin"
          }
        }
      };
      
    }
  }
]