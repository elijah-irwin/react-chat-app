// external imports
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// internal imports
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./sockets/users');

// server init
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// routes
app.use(router);

// socket init
io.on('connection', socket => {
  // new user joins a room handler
  socket.on('join', ({ name, room }, cb) => {
    const { user, error } = addUser(socket.id, name, room);
    if (error) return cb(error);

    socket.join(user.room);
    io.in(user.room).emit('message', {
      user: 'system',
      text: `${user.name} has just joined the chat!`,
    });
    io.in(user.room).emit('room-data', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  // user written messages handler
  socket.on('send-message', (message, cb) => {
    const user = getUser(socket.id);
    io.in(user.room).emit('message', {
      user: user.name,
      text: message,
    });
    cb();
  });

  // disconnect handler
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.in(user.room).emit('message', {
        user: 'system',
        text: `${user.name} has left the chat... 😢`,
      });
      io.in(user.room).emit('room-data', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// run server
server.listen(PORT, () => console.log(`[server] started on port ${PORT}`));
