const express = require('express');
const { getUser, updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have an authentication middleware

const router = express.Router();

router.get('/:user_id', getUser);
router.put('/:user_id', authenticate, updateUserProfile);
router.delete('/:user_id', authenticate, deleteUserProfile);

module.exports = router;