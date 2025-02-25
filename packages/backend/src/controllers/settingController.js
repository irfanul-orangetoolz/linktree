const settingService = require('../services/settingService');

// Retrieve user settings
const getUserSettings = async (req, res) => {
    try {
        const { id } = req.user.dataValues;
        const settings = await settingService.getUserSettings(id);
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update user settings
const updateUserSettings = async (req, res) => {
    try {
        const { id } = req.user.dataValues;
        const updateData = req.body;
        const updatedSettings = await settingService.updateUserSettings(id, updateData);
        res.json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getUserSettings,
    updateUserSettings
};
