var socket = io(); 
  
// scroll function
function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    
    jQuery('#messages').append(html);
    
    scrollToBottom();
});


//emited by the server lisend by the client(location)
socket.on('newLocationMessage', function(message) {
   
  var formatedTime = moment(message.createdAt).format('h:mm a');
    
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formatedTime
    });
    
    jQuery('#messages').append(html);
    
    //
    scrollToBottom();
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