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
  deck: [String], // Array of strings to represent cards
  hands: { type: Map, of: [String] }, // Map of username to array of cards
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

// Method to start a game
gameSchema.methods.startGame = async function() {
  // Initialize the deck and shuffle it
  this.deck = Array.from({ length: 21 }, (_, i) => i + 1);
  this.deck = this.deck.sort(() => Math.random() - 0.5);
  
  // Draw three cards for each player
  for (let playerId of this.players) {
    let user = await User.findById(playerId);
    this.hands.set(user.username, this.deck.splice(0, 3));
  }
  
  this.state = 'started';
  await this.save();
  return this;
};

// Method to draw a card
gameSchema.methods.drawCard = async function(username) {
  // Check if there are cards left in the deck
  if (this.deck.length === 0) throw new Error('Deck is empty');
  
  let hand = this.hands.get(username);
  hand.push(this.deck.pop());
  await this.save();
  return this;
};

// Method to play a card
gameSchema.methods.playCard = async function(username, cardIndex) {
  let hand = this.hands.get(username);
  
  // Check if the cardIndex is valid
  if (cardIndex < 0 || cardIndex >= hand.length) throw new Error('Invalid card index');
  
  let playedCard = hand.splice(cardIndex, 1)[0];
  await this.save();
  return playedCard; // Or do whatever you want with the played card
};

module.exports = mongoose.model('Game', gameSchema);
