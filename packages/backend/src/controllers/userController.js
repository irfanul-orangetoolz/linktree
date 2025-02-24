const { getUserById, updateUser, deleteUser } = require('../services/userService');

const getUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const updateData = req.body;
    const user = await updateUser(userId, updateData);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const result = await deleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  updateUserProfile,
  deleteUserProfile,
};