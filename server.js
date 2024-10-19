const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url.startsWith('/static/')) {
    const filePath = path.join(__dirname, 'public', req.url.slice(8));
    const fileExtension = path.extname(filePath).slice(1);
    let contentType = 'text/plain';
    switch (fileExtension) {
      case 'html':
        contentType = 'text/html';
        break;
      case 'css':
        contentType = 'text/css';
        break;
      case 'js':
        contentType = 'text/javascript';
        break;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.setHeader('Content-Type', contentType);
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
