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
    var formatedTime = moment(message.createdAt).format('h:mm a');
    
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formatedTime}: ${message.text}`);
    
    jQuery('#messages').append(li);
});


//emited by the server lisend by the client(location)
socket.on('newLocationMessage', function(message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    
    var li = jQuery('<li></li>');
    var a = jQuery('<a target= "_blank">My current location</a>');
    

    li.text(`${message.from} ${formatedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    
    jQuery('#messages').append(li);
});


//jQuery dom manipulation, emiting message from client and callback confirmation
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    var messageTextbox = jQuery('[name=message]');
    
    socket.emit('createMessage', {
        from: 'VidixOffenzix',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});


//emiting location from client
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    
  navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('Send location');
      
      
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude  
      });
      
}, function() {
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location');
  });  
});