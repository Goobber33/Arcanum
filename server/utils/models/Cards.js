const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  
  
    cardname: {
    type: String,
    unique: true,
    required: true
  },
  offence: {
    type: String,
    required: true
  },
  defence: {
    type: String,
    required: true
  },
  health: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('User', CardSchema);
