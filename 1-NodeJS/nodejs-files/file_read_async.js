var fs = require('fs');
function readFruit(fd, fruits) {
	var buf = new Buffer(5);
	buf.fill('');
	fs.read(fd, buf, 0, 5, null, function (err, bytes, data) { 
	//offset是写入buf的起始位置，若需要从buf起始位置开始写入数据，offset的值可为0或
	//任意可类型转换为0的数据,比如"0",null,undefined,false.此外offset+length等于buf.length才不会出错.
		if (bytes > 0) {
			console.log("read %dbytes", bytes);
			fruits += data;
			readFruit(fd, fruits);
		} else {
			fs.close(fd);
			console.log("Fruits: %s", fruits);
		}
	});
}
fs.open('fruit.txt', 'r', function (err, fd) {
	readFruit(fd, "");
});
