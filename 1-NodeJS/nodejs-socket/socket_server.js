var net = require('net');
var server = net.createServer(function(client) { //createServer()创建一个新的net.Server对象,其回调函数默认作为connection事件的的处理程序
  // 当服务器收到一个连接时，会创建一个Socket对象，传给上述连接事件处理程序
  console.log('Client connection: ');
  console.log('   local = %s:%s', client.localAddress, client.localPort);
  console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);
  client.setTimeout(500);  
  client.setEncoding('utf8');
  client.on('data', function(data) {     //监听客户端发来的数据事件
    console.log('Received data from client on port %d: %s',
                client.remotePort, data.toString());
    console.log('  Bytes received: ' + client.bytesRead); // 读取的字节数
    writeData(client, 'Sending: ' + data.toString());
    console.log('  Bytes sent: ' + client.bytesWritten);  //写入的字节数
  });
  client.on('end', function() {
    console.log('Client disconnected');
    server.getConnections(function(err, count){  //返回当前连接到服务器的连接数量
      console.log('Remaining Connections: ' + count);
    });
  });
  client.on('error', function(err) {
    console.log('Socket Error: ', JSON.stringify(err));
  });
  client.on('timeout', function() {
    console.log('Socket Timed out');
  });
});
server.listen(8107, function() {   //打开8107端口并开始监听连接。当端口打开时，回调函数调用
  console.log('Server listening: ' + JSON.stringify(server.address()));  //返回绑定的地址
  server.on('close', function(){  
    console.log('Server Terminated');
  });
  server.on('error', function(err){
    console.log('Server Error: ', JSON.stringify(err));
  });
});
function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }  
}