const mongoose = require('mongoose');
const User = require('./User');

const gameSchema = new mongoose.Schema({
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  state: {
    type: String,
    default: 'pending',
  },
  // Add other properties as required for your game
});

// Method to create a game
gameSchema.statics.createGame = async function(gameData, username) {
  // Find the user by username
  const user = await User.findOne({ username });

  // If the user does not exist, throw an error or handle it as you want
  if (!user) throw new Error('User not found');

  // Add the user's id to the gameData
  gameData.players = [user._id];

  const game = new this(gameData);
  await game.save();
  return game;
};

// Method to join a game
gameSchema.statics.joinGame = async function(gameId, username) {
  // Find the game and the user
  const game = await this.findById(gameId);
  const user = await User.findOne({ username });

  // If the user does not exist, throw an error or handle it as you want
  if (!user) throw new Error('User not found');

  // Add the user's id to the players array
  game.players.push(user._id);
  await game.save();
  return game;
};

// Method to leave a game
gameSchema.methods.leaveGame = async function(userId) {
  // Remove the user from the players array
  this.players = this.players.filter(playerId => !playerId.equals(userId));
  await this.save();
  return this;
};

// Method to update game state
gameSchema.methods.updateGame = async function(newState) {
  // Update the state
  this.state = newState;
  await this.save();
  return this;
};

module.exports = mongoose.model('Game', gameSchema);
