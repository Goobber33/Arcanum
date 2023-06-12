const express = require('express');
const Game = require('../utils/models/Game');

let io;

// Function to store 'io' instance
function setIo(socketIoInstance) {
  io = socketIoInstance;
}

const router = express.Router();

// Route to create a game
router.post('/create', async (req, res) => {
  try {
    const gameData = req.body;
    const game = await Game.createGame(gameData);
    io.emit('gameCreated', game);  // Emitting an event 'gameCreated' to all connected clients
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to join a game
router.post('/join', async (req, res) => {
  try {
    const { gameId, userId } = req.body;
    const game = await Game.joinGame(gameId, userId);
    io.emit('gameUpdated', game);  // Emitting an event 'gameUpdated' to all connected clients
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to leave a game
router.post('/leave', async (req, res) => {
  try {
    const { gameId, userId } = req.body;
    const game = await Game.leaveGame(gameId, userId);
    io.emit('gameUpdated', game);  // Emitting an event 'gameUpdated' to all connected clients
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a game
router.put('/update', async (req, res) => {
  try {
    const { gameId, gameData } = req.body;
    const game = await Game.updateGame(gameId, gameData);
    io.emit('gameUpdated', game);  // Emitting an event 'gameUpdated' to all connected clients
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router, setIo };  // Export the router and setIo function
