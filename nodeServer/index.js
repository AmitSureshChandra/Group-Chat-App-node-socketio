const io = require('socket.io')(8000,{
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
})

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // user[socket.id] = name;
        console.log(name)
        // emmits everyone except user name
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive',{message : message, name : user[socket.id]});
    });
})