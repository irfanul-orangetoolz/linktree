const express = require('express');
const LinkController = require('../controllers/linkController');
const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have an authentication middleware

const router = express.Router();
const linkController = new LinkController(); // Create an instance of LinkController

router.post('/', authenticate, linkController.createLink);
router.get('/', authenticate, linkController.getLinks);
router.put('/:link_id', authenticate, linkController.updateLink);
router.delete('/:link_id', authenticate, linkController.deleteLink);
router.put('/:link_id/priority', authenticate, linkController.updatePriority);
router.put('/:link_id/archive', authenticate, linkController.archiveLink);

module.exports = router;