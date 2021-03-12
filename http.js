var fs = require('fs');
var http= require('http');
var host = '127.0.0.1';
var port = "5178";

var server = http.createServer(function(req,res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    //its inside due to node js how it read files, after create the server the open the file and after open the file, wan to display the content
    fs.readFile('index.html',function(err,data){
        res.write(data);
        res.end("Hello World");
    });
});

server.listen(port,host, function(){
    console.log("server is running on port" + port);
});