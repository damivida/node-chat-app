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
    console.log('New user connected ');
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



server.listen(port, () => {
    console.log(`port is on ${port}`);
});