const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const {authenticate} = require('../middleware/authMiddleware');

// Retrieve user settings
router.get('/', authenticate, settingController.getUserSettings);

// Update user settings
router.put('/', authenticate, settingController.updateUserSettings);

module.exports = router;