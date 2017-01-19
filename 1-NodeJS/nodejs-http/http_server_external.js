var http = require('http');
var url = require('url');
var qstring = require('querystring');
function sendResponse(weatherData, res) {   //传入weatherData和ServerResponse对象
  var page = '<html><head><title>External Example</title></head>' +
  	'<body>' +
  	'<form method = "post">' +
  	'City: <input name = "city"><br/>' + 
  	'<input type = "submit" value = "Get Weather">' +
  	'</form>';
  	if(weatherData) {		//如果有weatherData，则添加页面显示内容
  		page += '<h1>weather Info</h1><p>' +  weatherData + '</p>';
  	}
  	page += '</body></html>';
  	res.end(page);   //ServerResponse对象调用end()将页面page作为服务器响应的正文传给浏览器
}
function parseWeather(weatherResponse, res) {   //进一步处理
	var weatherData = '';
	weatherResponse.on('data', function (chunk) { //IncomingMessage实现了一个Readable流，可以监听data事件，调用事件处理程序
		weatherData += chunk;		//外部API得到的weather数据最终被传给weatherData
	});
	weatherResponse.on('end', function () {  //当数据传完后，调用sendResponse函数，传入weatherData和ServerResponse对象
		sendResponse(weatherData,res);
	});
}
function getWeather(city, res) {  //向外部API发起请求，res是调用POST时创建的ServerResponse对象
	var options = {		//选项
		host: 'api.openweathermap.org',			//外部主机
		path: '/data/2.5/forecast/city?q=' + city +'&APPID=440d402a4bf372e89ac5bc2108869314'	//路径和查询字符串，包含申请的API KEY
	};
	http.request(options, function (weatherResponse) { //在内部创建一个ClientRequest对象，外部网站返回数据后调用回调函数，
													   // 其参数是weatherResponse，也是一个IncomingMessage对象
		parseWeather(weatherResponse, res);  //将外部得到的IncomingMessage和ServerResponse传给parseWeather()
	}).end();
}
http.createServer(function (req, res) { //req是服务端请求，是一个IncomingMessage对象，res是服务器收到客户端请求后创建的ServerResponse对象
	console.log(req.method);
	if (req.method == 'POST') {   //当用户填写城市名称并提交后，以POST方式访问服务器，服务器将调用通过一系列调用来生成一个带有weather数据的页面发给浏览器
		var reqData = '';
		req.on('data', function (chunk) {    //IncomingMessage实现了一个Readable流，可以监听data事件，调用事件处理程序
			reqData += chunk;	//得到用户输入数据，如city = London
			// console.log(reqData);
		});
		req.on('end', function () {		//数据传完后调用回调函数
			var postParams = qstring.parse(reqData);  //将查询字符串转换成对象{ city : 'London'}
			// console.log(postParams);  
			getWeather(postParams.city, res); // 将'London'传入getWeather，res是客户端发出POST请求时服务器创建的ServerResponse对象
		});
	} else {
		sendResponse(null, res);   //当用户第一次访问网站时，请求方式是GET，服务器直接调用senResponse()，发送默认页面给浏览器
	}
}).listen(8000);