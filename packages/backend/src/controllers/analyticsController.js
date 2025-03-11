const analyticsService = require('../services/analyticsService');

// Retrieve profile view analytics
const getProfileViews = async (req, res) => {
    try {
        const { id } = req.user.dataValues;
        const profileViews = await analyticsService.getProfileViews(id);
        res.json(profileViews);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Retrieve link click analytics
const getLinkClicks = async (req, res) => {
    try {
         const { id } = req.user.dataValues;
        const linkClicks = await analyticsService.getLinkClicks(id);
        res.json(linkClicks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Retrieve top-performing links analytics
const getTopLinks = async (req, res) => {
    try {
        console.log(req.user, "user")

         const { id } = req.user.dataValues;
        const topLinks = await analyticsService.getTopLinks(id);
        res.json(topLinks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const countClicksAndViews = async (req, res) => {
    try {
         const { linkId, userId,eventType } = req.body;
        const countViews = await analyticsService.countClicksAndViews(linkId, userId,eventType);
         res.status(201).json(countViews);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getProfileViews,
    getLinkClicks,
    getTopLinks,
    countClicksAndViews
};
