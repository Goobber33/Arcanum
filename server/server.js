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
    origin: 'http://localhost:3000', // Add the allowed origin for socket.io here
    methods: ['GET', 'POST'], // Add the allowed methods if necessary
    allowedHeaders: ['Authorization'], // Add the allowed headers if necessary
  },
});

// Assuming you have a way of storing current games
let currentGames = [];

// Passing 'io' object to gameRoutes
gameRoutes.setIo(io);

io.on('connect', async (socket) => {
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

  // New game events
  socket.on("start-game", async (gameId) => {
    const game = currentGames.find(game => game._id === gameId);

    if (!game) {
      socket.emit("game-error", "Game not found");
    } else {
      const updatedGame = await game.startGame();

      socket.join(gameId); // Join the game room
      io.in(gameId).emit("game-updated", updatedGame);

      const turn = decideTurn(game); // Implement this function as per your game rules
      io.in(gameId).emit("turn", turn);
    }
  });

  socket.on("draw-card", async ({ gameId, username }) => {
    const game = currentGames.find(game => game._id === gameId);

    if (!game) {
      socket.emit("game-error", "Game not found");
    } else {
      const updatedGame = await game.drawCard(username);
      io.in(gameId).emit("game-updated", updatedGame);

      const turn = decideTurn(game); // Implement this function as per your game rules
      io.in(gameId).emit("turn", turn);
    }
  });

  socket.on("play-card", async ({ gameId, username, cardIndex }) => {
    const game = currentGames.find(game => game._id === gameId);

    if (!game) {
      socket.emit("game-error", "Game not found");
    } else {
      const playedCard = await game.playCard(username, cardIndex);
      io.in(gameId).emit("card-played", { game, playedCard });

      const turn = decideTurn(game); // Implement this function as per your game rules
      io.in(gameId).emit("turn", turn);
    }
  });
});

mongoose.connect(process.env.MONGODB_URI, {
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

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
