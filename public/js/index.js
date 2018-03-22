var socket = io(); 
       
// using connection with socket.io
socket.on('connect', function () {
console.log('New user connected');
    
});

//using disconnection with socket.io
socket.on('disconnect', function ()  {
console.log('Disconnected from server'); 
});


//emited by the server lisend by the client(message) 
socket.on('newMessage', function (message) {
    console.log('New message', message);
    
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li);
});


////emited by the server lisend by the client(location)
socket.on('newLocationMessage', function(message) {
    
    var li = jQuery('<li></li>');
    var a = jQuery('<a target= "_blank">My current location</a>');
    

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    
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


//emiting location from client
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    
  navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude  
      });
      
}, function() {
      alert('Unable to fetch location');
  });  
});