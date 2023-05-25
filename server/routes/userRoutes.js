const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../utils/models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).send('Missing fields');
  }
  
  const user = new User({ username, password });
  await user.save();

  const token = jwt.sign({ _id: user._id }, 'SECRET_KEY');
  
  res.send({ token });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  
  if (!user) {
    return res.status(400).send('Invalid login');
  }
  
  user.comparePassword(password, (err, isMatch) => {
    if (err) {
      return res.status(400).send('Invalid login');
    }
    
    if (!isMatch) {
      return res.status(400).send('Invalid login');
    }

    const token = jwt.sign({ _id: user._id }, 'SECRET_KEY');

    res.send({ token });
  });
});

module.exports = router;
