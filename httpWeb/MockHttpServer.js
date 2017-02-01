var http = require("http");
var path = require("path");
var fs = require("fs");
var util = require("util");
var port = 4001;

var reportError = function(err){
	console.log(err);
	res.writeHead(500);
	res.end("Internal Server Error");
};
/**
 * 1.listening 监听服务器启动阶段-- 每次启动服务器产生一次
 *
 * 2.connection 监听TCP连接握手阶段-- 每个TCP连接产生一次
 *
 * 3.request 监听HTTP请求阶段-- 每个http请求产生一次
 *
 */
var server = http.createServer();

//每当开启服务时，会监听服务器
server.on("listening", function(){
	console.log("Server is listening on port:", port );
});

//每当产生一个TCP连接时，会监听到一个connection事件。可以获取TCP连接套接字对象。
server.on("connection", function(socket){
	//console.log(util.inspect(socket)); //打印套接字对象
	//server.close();
});

//完成TCP连接之后，基于该服务可以监听HTTP消息服务。
server.on("request", function (req, res) {
	//req.url,
	//req.headers
	var file = path.normalize('.' + req.url);  //使用path.normalize规范化路径
	console.log("Trying to server:", file);
	//静态文件服务
	fs.exists(file, function(exists){  //判断所访问的路径在文件系统中是否存在
		if(exists){
			console.log("exists:", exists);
			fs.stat(file, function( err ,stat ){  //获取文件的统计信息
				if(err){
					return reportError(err);
				}
				if( stat.isDirectory()){  //判断是否文件夹
					res.writeHead( 403 );
					res.end("Forbidden");
				}
				else{
					var ios = fs.createReadStream(file);
					ios.on("error", reportError);
					res.writeHead(200);
					ios.pipe(res);
				}
			});
		}
		else{
			res.writeHead( 404 );
			res.end("Not found");
		}
	});
});

server.on("close", function(){
	console.log("server close");
});

server.on("error", function(error){
	console.log("Server has something wrong");
});

server.listen(port);