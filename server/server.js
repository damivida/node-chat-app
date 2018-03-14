const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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
    
    
    
    //challange-
    
    //snding a message to new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
   
    //sending a message to other users that new user is connected
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  
    
    
    
     //lisening for an even from client
      socket.on('createMessage', (message) => {
        console.log('Creating an:', message);
          io.emit('newMessage', generateMessage(message.from, message.text));
          
          
          //sending message to all users except sender
       /*   socket.broadcast.emit('newMessage', {
              from: message.from,
              text: message.text,
              createdAt: new Date().getTime()
          });*/
    });
    
    
    //lisening for an even from client 
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    
   
});



server.listen(port, () => {
    console.log(`port is on ${port}`);
});