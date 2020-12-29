const io = require('socket.io')(5000,{
    cors: {
      origin: process.env.SERVER_ADDRESS,
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
    });

    // on user send message broadcast to all
    socket.on('send', message => {
        if(users[socket.id]){
            socket.broadcast.emit('receive',{message : message, name : users[socket.id]});
        }
    });

    // on user leave => broadcast it to all people
    socket.on('disconnect', (message) => {
        if(users[socket.id]){
            socket.broadcast.emit('leave',users[socket.id]);
        }      
        delete users[socket.id]
    });
})