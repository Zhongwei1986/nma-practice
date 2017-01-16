var fs = require('fs');
var Path = require('path');
function WalkDirs(dirPath) {
	console.log(dirPath);
	fs.readdir(dirPath, function (err, entires) {
		for(var idx in entires){
			var fullPath = Path.join(dirPath, entires[idx]);
			(function (fullPath) {
				fs.stat(fullPath, function (err, stats) {
					if (stats && stats.isFile()){
						console.log(fullPath);
					} else if (stats && stats.isDirectory()){
						WalkDirs(fullPath);
					}
				});
			})(fullPath);
		}
	});
}
WalkDirs("../1-NodeJS");