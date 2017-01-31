var http = require("http");
var util = require("util");


var server = http.createServer();

server.on("request", function(req, res){


	res.writeHead( 200, {"Content-Type": "text/plain"});
	res.write("Hello world");
	//*************res.end 是必须的。他会在请求结束前把字符串或缓冲写入响应区****************
	res.end(util.inspect(req.headers));
});

server.on("data", function(req, res){});

server.listen(4000);
