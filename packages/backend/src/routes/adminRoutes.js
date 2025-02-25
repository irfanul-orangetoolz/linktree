const express = require('express');
const router = express.Router();
const { fetchAllUsers, fetchPlatformAnalytics } = require('../controllers/adminController');
const {isAdmin} = require('../middleware/adminMIddleware'); // Ensure only admin can access these routes

// Fetch all users - protected route (only accessible by admin)
router.get('/users', isAdmin, fetchAllUsers);

// Fetch platform-wide analytics - protected route (only accessible by admin)
router.get('/analytics', isAdmin, fetchPlatformAnalytics);

module.exports = router;
