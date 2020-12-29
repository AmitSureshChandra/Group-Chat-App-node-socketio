// const express = require('express');
// const app = new express();
// const path = require('path');

// app.use(express.static(__dirname + '/public'));

// app.get('/', function(request, response){
//     response.sendFile(path.join('public/index.html'));
// });

// var server = app.listen(5000,() => console.log('running at 5000'))

const io = require('socket.io')(5000,{
    cors: {
      origin: "http://localhost:8081",
      methods: ["GET", "POST"]
    }
})

const users = {};

io.on('connection', socket => {
    
    // on new user join => broadcast it to all people
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        // emmits everyone except user name
        if(users[socket.id]){
            socket.broadcast.emit('user-joined',name);
        }
        socket.broadcast.emit('user-joined',name);
    });

    // on user send message broadcast to all
    socket.on('send', message => {
        if(users[socket.id]){
            socket.broadcast.emit('receive',{message : message, name : users[socket.id]});
        }
    });

    // on user leave => broadcast it to all people
    socket.on('disconnect', message => {
        if(users[socket.id]){
            socket.broadcast.emit('leave',users[socket.id]);
        }      
        delete users[socket.id]
    });
})