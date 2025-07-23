// login 模块 mock
import pkg from 'jsonwebtoken';

const { sign,decode } = pkg;
// 安全性 编码的时候加密
// 解码的时候用于解密
// 加盐 
const secret = '!&5d646hcode';
export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: (req,res) => {
      const { username, password } = req.body;
      // console.log("username"+username,"password"+password)
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
        { expiresIn: '2h' }  
      );
      return {
        code: 0,
        message: 'success',
        data: {  // 添加data层保持一致性
          token: token,
          user:{
            id: '001',
            username: 'admin' 
          }
        }
      };
      
    }
  },
  {
    url: '/api/user',
    method: 'get',
    timeout: 2000,
    response: (req,res) => {
      // 用户端 token headers
      const token = req.headers["authorization"].split(" ")[1]; // 假设token在请求头的Authorization字段中，格式为 Bearer toke;
      try {
          const decoded = decode(token, secret); // 解码token
          return {
            code: 0,
            message:'success',
            data: {  
              user: decoded.user 
            }
          };

      }catch(err) {
        return {
          code: 1,
          message: err.message,
          data: null
        }
      }
    }
  }
]