const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

//using connection with socket.io
io.on('connection', (socket) => {
    console.log('User connected ');
    
 
    //emiting an event - new message
/*    socket.emit('newMessage', {
        from: 'vida',
        text: 'Some text in form',
        createdAt: 11/3/2018
    });*/
    
    
    
    //challange-sending maessage from server
    
    //sending a message to new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
   
    //sending a message to other users that new user is connected
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  
    

     //lisening for an even from client(and sending back to client, message)
      socket.on('createMessage', (message, callback) => {
        console.log('Creating an:', message);
          io.emit('newMessage', generateMessage(message.from, message.text));
          callback();
          
        });
    
    
    //lisening for an even from client(and sending back to client, Locationmessage)     
          socket.on('createLocationMessage', (coords) => {
              io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
          });

          
   
    
    
    //lisening for an even from client 
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    
   
});



server.listen(port, () => {
    console.log(`port is on ${port}`);
});