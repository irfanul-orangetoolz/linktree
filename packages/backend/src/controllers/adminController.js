const { getAllUsers, getPlatformAnalytics } = require('../services/adminService');

// Controller to fetch all users (admin only)
const fetchAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json({
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// Controller to fetch platform-wide analytics (admin only)
const fetchPlatformAnalytics = async (req, res) => {
    try {
        const analytics = await getPlatformAnalytics();
        return res.status(200).json({
            message: 'Analytics fetched successfully',
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return res.status(500).json({ message: 'Failed to fetch analytics' });
    }
};

module.exports = {
    fetchAllUsers,
    fetchPlatformAnalytics
};
