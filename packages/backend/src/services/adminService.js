const { User, Analytic } = require('../models');

// Retrieve all users (admin only)
const getAllUsers = async () => {
    return await User.findAll({
        attributes: ['id', 'email', 'name', 'bio', 'profile_image_url', 'createdAt']
    });
};

// Retrieve platform-wide analytics (admin only)
const getPlatformAnalytics = async () => {
    const totalUsers = await User.count();
    const totalViews = await Analytic.count({ where: { event_type: 'view' } });
    const totalClicks = await Analytic.count({ where: { event_type: 'click' } });
    
    return {
        totalUsers,
        totalViews: totalViews || 0,
        totalClicks: totalClicks || 0
    };
};

module.exports = {
    getAllUsers,
    getPlatformAnalytics
};
