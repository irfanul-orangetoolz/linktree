const { User } = require('../models');
const db = require('../models');  // Ensure it points to models/index.js
// const User = db.User;
const Link = db.Link;
const SocialMediaAccount = db.SocialMediaAccount;  // Correct model name
const Setting = db.Setting;
const Analytic = db.Analytic;


const getUserById = async (userId) => {
    const user = await User.findByPk(userId, {
        include: [
             { model: SocialMediaAccount, as: 'SocialMediaAccounts' }, // Use correct alias
                { model: Link, as: 'Links' }, // Use alias defined in User model
        ]
    });
    
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const updateUser = async (userId, updateData) => {
    const { name, bio, profileImageUrl } = updateData;

    const user = await User.update(
        { name, bio, profileImageUrl },
        { where: { id: userId } }
    );
    if (!user) {
        throw new Error('User not found');
    }
    return { message: 'Profile updated successfully' };
};

// Delete user account
const deleteUser = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }

    await user.destroy();
    return { message: 'User deleted successfully' };
};

module.exports = {
    getUserById,
    updateUser,
    deleteUser
};
