var net = require('net');
function getConnection(connName){    //封装一个函数用来处理net.socket对象的创建和事件监听业务
  var client = net.connect({port: 8107, host:'localhost'}, function() { //创建一个Socket对象，并指定当连接对服务器打开时的回调函数
    console.log(connName + ' Connected: ');
    console.log('   local = %s:%s', this.localAddress, this.localPort); 
    console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
    this.setTimeout(500);   //net.Socket对象的方法，和JS标准的setTimeout()不同，只需要传入超时时间delay
    this.setEncoding('utf8');   //设定默认编码格式
    this.on('data', function(data) {  //回调函数的参数是Buffer对象
      console.log(connName + " From Server: " + data.toString());   //Buffer.toString()使用之前设置的默认编码方式
      this.end();     //主动关闭连接
    });
    this.on('end', function() { //end事件是服务器发送一个FIN终止连接时发出
      console.log(connName + ' Client disconnected');
    });
    this.on('error', function(err) {
      console.log('Socket Error: ', JSON.stringify(err));
    });
    this.on('timeout', function() {
      console.log('Socket Timed Out');
    });
    this.on('close', function() { //由net.Socket.end()触发
      console.log('Socket Closed');
    });
  });
  return client;
}
function writeData(socket, data){  //向服务器写数据
  var success = !socket.write(data);    //调用write()方法向服务器发送数据。如果数据发送完返回true，否则返回false；  
  if (!success){    //如果success是false，即本地还有内存缓冲区还有数据没有发完
    (function(socket, data){  //使用闭包保存socket和data
      socket.once('drain', function(){  //仅监听一次drain事件，当内存缓存清空时，重新发送data
        writeData(socket, data);
      });
    })(socket, data);
  }  
}
var Dwarves = getConnection("Dwarves");
var Elves = getConnection("Elves");
var Hobbits = getConnection("Hobbits");
writeData(Dwarves, "More Axes");
writeData(Elves, "More Arrows");
writeData(Hobbits, "More Pipe Weed");