function logCar(logMsg, callback) {
	// callback(logMsg);
	process.nextTick(function () {
		callback(logMsg);
	});
}

var cars = ["Ferrari", "Porshe", "Bugati"];
for (var idx in cars) {
	var message = "Saw a " + cars[idx];
	logCar(message, function () {
		console.log("Nomal Callbak:" + message);
	});	
}
for (var idx in cars) {
	var message = "Saw a " + cars[idx];
	(function (msg) {
		logCar(msg, function () {
			console.log("Closurr Callback: " + msg);
		});
	})(message);
}