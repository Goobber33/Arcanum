const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes');
// socket.io server connection
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();

// allow cross-origin requests
app.use(cors());

// parse JSON
app.use(express.json());

const httpServer = createServer(app);
// socket.io listener
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  },
});

io.on('connect', (socket) => {
  console.log('socket', socket);
  console.log("User connected", socket.id);

  socket.on('disconnect', () => {
    console.log("User disconnected", socket.id);
  });
});

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/game', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use the auth routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 4000;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
