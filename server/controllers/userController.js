const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../utils/models/User');
const { generateToken } = require('../utils/auth');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    // Generate JWT token
    const token = generateToken(newUser);
    // Send the token and newSignup flag to the client
    res.status(201).json({ token, newSignup: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    // Check password
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    // Generate JWT token
    const token = generateToken(existingUser);
    // Send the token and a new field "newSignup" to the client
    res.status(200).json({ token, newSignup: false });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

