const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/api/hello') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'  // 添加CORS支持
        });
        res.end(JSON.stringify({ message: 'Hello World' }));  // 必须调用end
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});