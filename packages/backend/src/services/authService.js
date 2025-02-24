const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Assuming you have a User model
const config = require('../config/config');
const secretKey = config.jwt.secret; //

// const secretKey = 'your_secret_key'; // Replace with your actual secret key

const registerUser = async (email, password, name, bio, profileImageUrl) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        password_hash: hashedPassword,
        name,
        bio,
        profileImageUrl
    });
    await user.save();
    console.log(secretKey, 'your_secret_key');
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    return { userId: user.id, token };
};

const loginUser = async (email, password) => {
    // return { message: 'Logged in successfully' };
    const user = await User.findOne({ where: { email: email } });
    console.log(user.password);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
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
    const user = await User.findByPk(userId);

    // delete user.dataValues
    delete user.dataValues.password_hash;
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
};
