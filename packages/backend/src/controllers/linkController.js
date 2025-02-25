const LinkService = require('../services/linkService');

class LinkController {
  constructor() {
    this.linkService = new LinkService();
  }

  async createLink(req, res) {
    try {
      const { title, url, priority } = req.body;
      const userId = req.user.id; // Assuming user ID is added to req.user by middleware
      const link = await this.linkService.createLink(userId, title, url, priority);
      res.status(200).json(link);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getLinks(req, res) {
    try {
      const userId = req.user.id; // Assuming user ID is added to req.user by middleware
      const links = await this.linkService.getLinks(userId);
      res.status(200).json(links);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateLink(req, res) {
    try {
      const linkId = req.params.link_id;
      const updateData = req.body;
      const link = await this.linkService.updateLink(linkId, updateData);
      res.status(200).json(link);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteLink(req, res) {
    try {
      const linkId = req.params.link_id;
      const result = await this.linkService.deleteLink(linkId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePriority(req, res) {
    try {
      const linkId = req.params.link_id;
      const { priority } = req.body;
      const link = await this.linkService.updatePriority(linkId, priority);
      res.status(200).json(link);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async archiveLink(req, res) {
    try {
      const linkId = req.params.link_id;
      const { isArchived } = req.body;
      const link = await this.linkService.archiveLink(linkId, isArchived);
      res.status(200).json(link);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = LinkController;