// ./apps/socketDemo.js

// app自体を再定義したら参照可能に！
var app = module.parent.exports,
// 退避したioをappから参照
io = app.get('io'),
net = app.get('net'),
flashSock = null;

io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

var chat = io.of("/chat").on('connection', function(client) {

	client.emit('connected');

	client.on('send', function(data) {
		chat.json.emit('message', data);

		if (flashSock) {
			flashJSON = JSON.stringify(data);
			flashSock.write(flashJSON);
		}

	});

});

var sockServer = net.createServer(function(socket) {

	console.log('client connected');

	flashSock = socket;
	socket.on('end', function(){
		console.log('client disconnected');
	});

	socket.on('data', function(buf) {

		var msg = buf.toString();
		if (msg.indexOf('swiffy complete') !== -1) {
			socket.emit('location', {href:'canvas.swf.html'});
			//console.log('complete');
		}
	});
});

sockServer.listen(4000, function(){
	console.log('server listen 4000');
});