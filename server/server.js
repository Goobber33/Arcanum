const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { roomHandler } = require('./utils/roomHandler');

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


const rooms = [];

io.on('connect', (socket) => {
  
  console.log("User connected", socket.id);
  // roomHandler(io, socket, rooms);

  socket.on('disconnect', () => {
    console.log("User disconnected", socket.id);
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
