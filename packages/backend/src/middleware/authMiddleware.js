const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Assuming you have a User model
const config = require('../config/config');
const secretKey = config.jwt.secret; // Replace with your actual secret key

const authenticate = async (req, res, next) => {
    // console.log(secretKey);
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = await User.findByPk(decoded.userId);
        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = { authenticate };
