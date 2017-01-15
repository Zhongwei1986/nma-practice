var fs = require('fs');
fd = fs.openSync('veggie.txt', 'r');   //同步方式打开一个文件，fd是返回的文件描述符
var veggies = "";
do {
	var buf = new Buffer(5);  //buf为5字节大小的Buffer缓冲块
	buf.fill();	//初始化缓冲区
	// console.log(buf.toString());
	var bytes = fs.readSync(fd, buf, null, 5);  // bytes是读取的字节数,length参数要小于或等于buffer长度
	console.log("read %dbytes", bytes);
	veggies += buf.toString();
} while (bytes > 0);
fs.closeSync(fd);
console.log("Veggies: " + veggies);