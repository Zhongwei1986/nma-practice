//启动http_serve_get.js后执行本文件可以得到hello.html的源码

var http = require('http');
var options = {
    hostname: 'localhost',
    port: '8080',
    path: '/hello.html'
};

function handleResponse(response) {
    var serverData = '';
    response.on('data', function(chunk) {
        serverData += chunk;
    });
    response.on('end', function() {
        console.log(serverData);
    });
}
http.request(options, function(response) {
    handleResponse(response);
}).end();
