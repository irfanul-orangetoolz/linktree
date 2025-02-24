const express = require('express');
const { signup, login, logout, me } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have an authentication middleware

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, me);

module.exports = router;