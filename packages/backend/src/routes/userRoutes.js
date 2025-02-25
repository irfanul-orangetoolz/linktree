const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware'); 

router.get('/:userId', userController.getUserById);
router.put('/:userId',authenticate, userController.updateUser);
router.delete('/:userId',authenticate, userController.deleteUser);

module.exports = router;