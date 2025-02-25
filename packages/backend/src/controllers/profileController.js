const profileService = require('../services/profileService');

// Retrieve user profile
const getUserProfile = async (req, res) => {
    try {
        const { user_id } = req.params;
        const profile = await profileService.getUserProfile(user_id);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getUserProfilePreview = async (req, res) => {
    try {
        const { id } = req.user.dataValues;
        console.log(id, 'id');
        const profile = await profileService.getUserProfile(id);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.user.dataValues;
        const updateData = req.body;
        const updatedProfile = await profileService.updateUserProfile(id, updateData);
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getUserProfilePreview
};