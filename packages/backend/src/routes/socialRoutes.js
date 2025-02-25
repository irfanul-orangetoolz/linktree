const express = require('express');
const SocialController = require('../controllers/socialController');
const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have an authentication middleware

const router = express.Router();
const socialController = new SocialController(); // Create an instance of SocialController

router.post('/connect', authenticate, socialController.connect);
router.get('/accounts', authenticate, socialController.getAccounts);
router.delete('/accounts/:social_id', authenticate, socialController.disconnect);
router.get('/data/:social_id', authenticate, socialController.getData);

module.exports = router;