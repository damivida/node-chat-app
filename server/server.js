const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

//using connection with socket.io
io.on('connection', (socket) => {
    console.log('User connected ');
    
    //emiting(creating an event new emila)
    socket.emit('newEmail', {
        from: 'vida.damir@gmail.com',
        text: 'Hell, it\'s working',
        createdAt: 5895
    });
    
    //emiting an event new message
    socket.emit('newMessage', {
        from: 'vida',
        text: 'Some text in form',
        createdAt: 11/3/2018
    });
    
    
    
     //lisening for an even from client
     socket.on('createEmail', (newEmail) => {
         console.log('Creating an:', newEmail);
     });
    
    socket.on('createMessage', (newMessage) => {
        console.log('Creating an:', newMessage);
    });
    
    
    //lisening for an even from client
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    
   
});



server.listen(port, () => {
    console.log(`port is on ${port}`);
});