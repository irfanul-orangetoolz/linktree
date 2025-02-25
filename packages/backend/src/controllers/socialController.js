const socialService = require('../services/socialService');

// Connect a social media account
const connectSocialAccount = async (req, res) => {
    try {
        const { platform, accessToken } = req.body;
        const { id } = req.user.dataValues;
        const socialAccount = await socialService.connectSocialAccount(id, platform, accessToken);
        res.status(201).json(socialAccount);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Retrieve connected social media accounts
const getSocialAccounts = async (req, res) => {
    try {
       const { id } = req.user.dataValues;
        const socialAccounts = await socialService.getSocialAccounts(id);
        res.json(socialAccounts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Fetch social media data
const getSocialData = async (req, res) => {
    try {
        const { social_id } = req.params;
        const socialData = await socialService.getSocialData(social_id);
        res.json(socialData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Disconnect a social media account
const disconnectSocialAccount = async (req, res) => {
    try {
        const { social_id } = req.params;
        await socialService.disconnectSocialAccount(social_id);
        res.json({ message: 'Social account disconnected successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    connectSocialAccount,
    getSocialAccounts,
    getSocialData,
    disconnectSocialAccount
};
