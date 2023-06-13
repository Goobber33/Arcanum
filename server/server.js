const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  },
});

// Passing 'io' object to gameRoutes
gameRoutes.setIo(io);

io.on('connect', async (socket) => {
  // trying to get socket data

  // for (const socket of sockets) {
  //   console.log(socket.id);
  //   console.log(socket.handshake);
  //   console.log(socket.rooms);
  //   console.log(socket.data);
  // }
  
  socket.join("room1");
  console.log(socket.rooms); // Set { <socket.id>, "room1" }

  console.log("User connected", socket.id);
  

  socket.on('disconnect', () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("send-message", (message, room)=> {
    if (room === '') {
      socket.broadcast.emit("receive-message", message)
    } else {
      socket.to(room).emit("receive-message", message)
    }
  });
});

mongoose.connect('mongodb://127.0.0.1:27017/game', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/auth', authRoutes);
app.use('/game', gameRoutes.router); 

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 4000;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
