const linkService = require('../services/linkService');

// Retrieve all links for authenticated user
const getLinks = async (req, res) => {
    try {
      const { id } = req.user.dataValues;
        const links = await linkService.getLinks(id);
        res.json(links);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Add a new link
const createLink = async (req, res) => {
    try {
        const { id } = req.user.dataValues;
        const { title, url, priority } = req.body;
        const link = await linkService.createLink(id, title, url, priority);
        res.status(201).json(link);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update an existing link
const updateLink = async (req, res) => {
    try {
        const { link_id } = req.params;
        const updateData = req.body;
        const updatedLink = await linkService.updateLink(link_id, updateData);
        res.json(updatedLink);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete a link
const deleteLink = async (req, res) => {
    try {
        const { link_id } = req.params;
        await linkService.deleteLink(link_id);
        res.json({ message: 'Link deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getLinks,
    createLink,
    updateLink,
    deleteLink
};
