const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const {authenticate} = require('../middleware/authMiddleware');

// Connect a social media account
router.post('/connect', authenticate, socialController.connectSocialAccount);

// Retrieve connected social media accounts
router.get('/accounts', authenticate, socialController.getSocialAccounts);

// Fetch social media data
router.get('/data/:social_id', authenticate, socialController.getSocialData);

// Disconnect a social media account
router.delete('/accounts/:social_id', authenticate, socialController.disconnectSocialAccount);
router.post('/accounts/connect-oauth', authenticate, socialController.createSocialAccount);
router.post('/oauth/instagram', authenticate, socialController.instagramOauthTokenExchange)
router.post('/oauth/linkedin', authenticate, socialController.linkedinOauthTokenExchange)
router.post('/oauth/facebook', authenticate, socialController.facebookOauthTokenExchange)
router.post('/on-fb-page-select', authenticate, socialController.onFbPageSelect)
module.exports = router;
