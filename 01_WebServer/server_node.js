const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        res.end("Hello there!");
    } else if (req.url === '/login') {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        res.end("Yet to logged in!");
    } else {
        res.statusCode = 404;
        res.setHeader('Content-type', 'text/plain');
        res.end("404! Page not Found!");
    }
})

server.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`);
})