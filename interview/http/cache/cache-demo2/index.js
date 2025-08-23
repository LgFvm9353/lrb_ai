// 协商缓存，在返回文件的同时，返回文件的响应头

const http = require('http')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')  // 加密 hash 计算

// 单向加密  生成hash
function md5(data){
   return crypto.createHash('md5').update(data).digest('hex')
}

http.createServer((req, res) => {
    if(req.url === '/')
    {
        const html = fs.readFileSync('test.html','utf-8')
        res.writeHead(200,{
            'Content-Type':'text/html',
        })
        res.end(html)
    }

    if(req.url === '/script.js')
    {
        const noneMatch = req.headers['if-none-match']
        const filePath = path.join(__dirname,'script.js')
        // 这边返回的是一个二进制文件
        const buffer = fs.readFileSync(filePath)
        const fileMd5 = md5(buffer)

        if(noneMatch === fileMd5)
        {
            res.statusCode = 304  // 304 Not Modified
            res.end()
            return 
        }

        res.writeHead(200,{
            'Content-Type':'text/javascript',
            'Cache-Control':'max-age=0',
            'ETag': fileMd5,
        })
        // 流式输出的写法
        const readStream = fs.createReadStream(filePath)
        readStream.pipe(res)
    }
}).listen(8888)

