const LinkDao = require('../dao/LinkDao'); // Assuming you have a LinkDao for database operations

class LinkService {
  constructor() {
    this.linkDao = new LinkDao();
  }

  async createLink(userId, title, url, priority) {
    const link = await this.linkDao.create({
      user_id: userId,
      title,
      url,
      priority,
    });
    return link;
  }

  async getLinks(userId) {
    return await this.linkDao.findByWhere({ user_id: userId });
  }

  async updateLink(linkId, updateData) {
    const updated = await this.linkDao.updateWhere(updateData, { link_id: linkId });
    if (!updated) {
      throw new Error('Link not found');
    }
    return updated;
  }

  async deleteLink(linkId) {
    const deleted = await this.linkDao.deleteByWhere({ link_id: linkId });
    if (!deleted) {
      throw new Error('Link not found');
    }
    return { message: 'Link deleted successfully' };
  }

  async updatePriority(linkId, priority) {
    const updated = await this.linkDao.updateWhere( { priority }, { link_id: linkId });
    if (!updated) {
      throw new Error('Link not found');
    }
    return updated;
  }

  async archiveLink(linkId, isArchived) {
    const updated = await this.linkDao.updateWhere({ is_archived: isArchived }, { link_id: linkId });
    if (!updated) {
      throw new Error('Link not found');
    }
    return updated;
  }
}

module.exports = LinkService;