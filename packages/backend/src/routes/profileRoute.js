const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const {authenticate} = require('../middleware/authMiddleware');

// Retrieve user profile
router.get('/:user_id', profileController.getUserProfile);

// Update user profile
router.get('/preview/mode', authenticate, profileController.getUserProfilePreview);

module.exports = router;