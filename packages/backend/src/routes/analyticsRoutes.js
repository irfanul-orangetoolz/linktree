const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const {authenticate} = require('../middleware/authMiddleware');

// Retrieve profile view analytics
router.get('/views', authenticate, analyticsController.getProfileViews);

// Retrieve link click analytics
router.get('/clicks', authenticate, analyticsController.getLinkClicks);

// Retrieve top-performing links
router.get('/top-links', authenticate, analyticsController.getTopLinks);

module.exports = router;