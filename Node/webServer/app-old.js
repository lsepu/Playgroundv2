const http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});

  const obj = {
    id: 1,
    name: 'juan'
  }

  //serialization
  response.end(JSON.stringify(obj));

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');