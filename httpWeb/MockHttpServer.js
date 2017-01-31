var http = require("http");
var path = require("path");
var fs = require("fs");

var server = http.createServer();

server.on("request", function (req, res) {
	//req.url,
	//req.headers
	var file = path.normalize('.' + req.url);
	console.log("Trying to server:", file);

	fs.exists(file, function(exists){
		if(exists){

		}
		else{
			res.writeHead( 404 );
			res.end("Not found");
		}
	});
});


server.listen(4001);