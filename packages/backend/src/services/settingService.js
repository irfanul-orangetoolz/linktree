const { Setting } = require('../models');

// Retrieve user settings
const getUserSettings = async (userId) => {
    const setting = await Setting.findOne({ where: { user_id: userId } });
    return setting;
};

// Update user settings
const updateUserSettings = async (userId, updateData) => {
    const setting = await Setting.findOne({ where: { user_id: userId } });
    if (!setting) {
        const newSetting = new Setting({ user_id: userId, ...updateData });
        await newSetting.save();
        return { message: 'Settings updated successfully' };
    }
    await Setting.update(updateData, { where: { user_id: userId } });
    return { message: 'Settings updated successfully' };
};

module.exports = {
    getUserSettings,
    updateUserSettings
};