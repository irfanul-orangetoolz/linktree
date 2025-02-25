const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const {authenticate} = require('../middleware/authMiddleware');

// Retrieve all links for authenticated user
router.get('/', authenticate, linkController.getLinks);

// Add a new link
router.post('/', authenticate, linkController.createLink);

// Update an existing link
router.put('/:link_id', authenticate, linkController.updateLink);

// Delete a link
router.delete('/:link_id', authenticate, linkController.deleteLink);

module.exports = router;
