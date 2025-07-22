// login 模块 mock
export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: (req,res) => {
      const { username, password } = req.body;
      if(username === 'admin' && password === '123456') {
        return{
          code: 0,
          message: 'success',
          token: 'admin-token'
        }
      } 
      
    }
  }
]