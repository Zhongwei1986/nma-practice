var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "\html";  //测试/html表示根目录\\html，\html和html\表示在文件后缀加html，但
						//前者\是转义符，不严谨，容易出错，推荐用html\表示当前目录的子目录html
http.createServer(function (req, res) {
	var urlObj = url.parse(req.url, true, false);  // 查询字符串解析为对象字面量，有pathname属性
	//通过ROOT_DIR + urlObj.pathname 可以实现访问子目录中的文件的同时不暴露网站目录
	fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) { 
		if (err) {
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return;
		}
		res.writeHead(200);
		res.end(data);
	});
}).listen(8080);