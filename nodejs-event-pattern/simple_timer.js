function simpleTimeout(consoleTimer) {
	// 创建当前时间与赋值给label的时间戳的时间差值，并输出结果
	console.timeEnd(consoleTimer);
}

console.time("twoSecond");  //当前时间戳赋值给字符串，下同
setTimeout(simpleTimeout, 2000, "twoSecond");  //将"twoSecond"赋值给simpleTimeout()
console.time("oneSecond");  
setTimeout(simpleTimeout, 1000, "oneSecond");
console.time("fiveSecond");  
setTimeout(simpleTimeout, 5000, "fiveSecond");
console.time("50MilliSecond");  
setTimeout(simpleTimeout, 50, "50MilliSecond");

//setTimeout调用时间不重要。