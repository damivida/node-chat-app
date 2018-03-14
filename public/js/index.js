var socket = io(); 
       
// using connection with socket.io
socket.on('connect', function () {
console.log('New user connected');
    

 /*   socket.emit('createMessage', {
        from: 'vidix',
        text: 'message text'
    });*/
});

//using disconection with socket.io
socket.on('disconnect', function ()  {
console.log('Disconnected from server'); 
});

//emited by the server lisend by the client 
socket.on('newMessage', function (message) {
    console.log('New message', message);
});


//emited by the server lisend by the client 
/*socket.on('wellcomeMessage', function(message) {
    console.log('Welcome message', message);
});*/