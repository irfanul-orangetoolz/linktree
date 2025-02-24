const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Assuming you have a User model

const secretKey = 'your_secret_key'; // Replace with your actual secret key

const registerUser = async (email, password, name, bio, profileImageUrl) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, name, bio, profileImageUrl });
  await user.save();
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  return { userId: user.id, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  return { userId: user.id, token };
};

const logoutUser = async (token) => {
  // Implement token invalidation logic here
  return { message: 'Logged out successfully' };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
};