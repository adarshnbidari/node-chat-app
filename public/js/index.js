var socket=io();
socket.on('connect',()=>{
console.log('client connected!');
});

socket.on('disconnect',()=>{
console.log('client disconnected!');
});

socket.on('newMessage',(message)=>{
	console.log('newMessage',message);
	
	var li=$("<li></li>");
	li.text(`${message.from}: ${message.text}`);
	
	$(document).ready(function(){
		$("#messages").append(li);
		$("[name=message]").val("");
	});
	
});


socket.emit('createMessage',{
	from:'adarsh',
	text:'hello bidari!...'
},(data)=>{
	console.log('Delivered!... :)',data);
});

$(document).ready(function(){
	$("#message-form").on("submit",function(event){
		event.preventDefault();
		socket.emit('createMessage',{
			from:'User',
			text:$("[name=message]").val()
		},function(){

		});
		
	});
});