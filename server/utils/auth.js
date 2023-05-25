const jwt = require('jsonwebtoken');

// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username }, 
    SECRET_KEY, 
    { expiresIn: '1h' } // Token expires in 1 hour
  );
}

// Function to verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
