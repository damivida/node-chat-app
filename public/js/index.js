var socket = io(); 
       
// using connection with socket.io
socket.on('connect', function () {
console.log('New user connected');
    
    
    socket.emit('createEmail', {
       to: 'neki@mail.com',
       text: 'neki tekst'    
    });
    
    socket.emit('createMessage', {
        from: 'vidix',
        text: 'mssage text'
    });
});

//using disconection with socket.io
socket.on('disconnect', function ()  {
console.log('Disconnected from server'); 
});

//emited by the server lisend by the client 
socket.on('newEmail', function (email) {
    console.log('New email', email);
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});