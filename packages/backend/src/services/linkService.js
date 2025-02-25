const { Link } = require('../models');

// Retrieve all links for a user
const getLinks = async (userId) => {
    return await Link.findAll({ where: { user_id: userId } });
};

// Create a new link
const createLink = async (userId, title, url, priority) => {
    const link = new Link({ user_id: userId, title, url, priority });
  await link.save();
  return link;
};

// Update an existing link
const updateLink = async (linkId, updateData) => {
  const link = await Link.update(
    updateData,
    { where: { id: linkId } }
  );
  if (!link) {
    throw new Error('Link not found');
  }
    return { message: 'Link updated successfully' };;
};

// Delete a link
const deleteLink = async (linkId) => {
    const link = await Link.findByPk(linkId);
    if (!link) {
        throw new Error('Link not found');
    }
    await link.destroy();
};

module.exports = {
    getLinks,
    createLink,
    updateLink,
    deleteLink
};
