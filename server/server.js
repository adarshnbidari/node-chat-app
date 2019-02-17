const path=require('path');

const http=require('http');

const express=require('express');

const socketIO=require('socket.io');

const {generateMessage}=require('./message');

// -------

const publicPath=path.join(__dirname,'../public');

var app=express();


var server=http.createServer(app);

var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('new user connected!')
	
	socket.emit('newMessage',generateMessage('Admin','welcome to the chat app'));
	
	socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));
	
	
	socket.on('createMessage',(message,callback)=>{
	console.log('createMessage',message);
	io.emit('newMessage',generateMessage(message.from,message.text));
	callback('From server');
	/* socket.broadcast.emit('newMessage',{
		from:message.from,
		text:message.text,
		createdAt:new Date().getTime()
	}); */
	
	});
	
	socket.on('disconnect',()=>{
		console.log('user disconnected!');
	});
	
});

server.listen(80,()=>{
	console.log("Here we go!...");
});

