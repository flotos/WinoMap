//Lets require/import the HTTP module
var http = require('http');
var sleep = require('sleep');
var util = require('util');

//Lets define a port we want to listen to
const PORT=8042;
var value = "[0,0]";

//We need a function which handles requests and send response
function handleRequest(request, response){
	response.writeHead(200, {
		'Access-Control-Allow-Origin': 'http://localhost:8080',
		'Access-Control-Allow-Credentials': 'true'
	});
	response.write("" + value);
    response.end('');
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
	console.log('received data:', util.inspect(text));
	value = text;
});
