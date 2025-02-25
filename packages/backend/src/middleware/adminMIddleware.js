const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Assuming you have a User model
const config = require('../config/config');
const secretKey = config.jwt.secret;

// Middleware to check if user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, secretKey); // Assuming JWT_SECRET is stored in your environment variables

    // Find the user and check their role
    const user = await User.findByPk(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role is required.' });
    }

    // Attach user data to request object for further use in route handlers
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {isAdmin};
