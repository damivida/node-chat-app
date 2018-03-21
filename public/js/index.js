var socket = io(); 
       
// using connection with socket.io
socket.on('connect', function () {
console.log('New user connected');
    
});

//using disconnection with socket.io
socket.on('disconnect', function ()  {
console.log('Disconnected from server'); 
});


//emited by the server lisend by the client 
socket.on('newMessage', function (message) {
    console.log('New message', message);
    
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li);
});



//jQuery dom manipulation, emiting text from client and callback confirmation
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'VidixOffenzix',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});