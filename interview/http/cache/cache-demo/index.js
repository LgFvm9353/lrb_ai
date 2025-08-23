const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
   if(req.url === '/')
   {
    // async 异步 sync 同步
    // node 读取文件默认是异步的
     const html = fs.readFileSync('test.html','utf-8')
      res.writeHead(200,{
            'Content-Type':'text/html'
        })
        res.end(html)
   }
   if(req.url === '/script.js')
   {
    const js = fs.readFileSync('script.js','utf-8')
    res.writeHead(200,{
        'Content-Type':'text/javascript',
        // 'Cache-Control':'max-age=10,public'
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
    })
    res.end(js)
   }
}).listen(8080, () => {
  console.log('Server is running at http://localhost:8080')
})
