const { User } = require('../models');
const db = require('../models');  // Ensure it points to models/index.js
// const User = db.User;
const Link = db.Link;
const SocialMediaAccount = db.SocialMediaAccount;  // Correct model name
const Setting = db.Setting;
const Analytic = db.Analytic;

// Retrieve user profile
const getUserProfile = async (userId) => {
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

const getUserProfileByUserName = async (userName) => {
    const user = await User.findOne({where:{user_name:userName}}, {
            include: [
                 { model: SocialMediaAccount, as: 'SocialMediaAccounts' }, // Use correct alias
                    { model: Link, as: 'Links' }, // Use alias defined in User model
            ]
    });
    const link = await Link.findAll({
        where: {
        user_id:user.dataValues.id
        }
    })
    const socialAccount = await SocialMediaAccount.findAll({
        where: {
        user_id:user.dataValues.id
        }
    })
    console.log(user, "oooo",link)    
        if (!user) {
            throw new Error('User not found');
        }
        return {...user.dataValues,Links:link, SocialMediaAccount: socialAccount};
}
// Update user profile
const updateUserProfile = async (userId, updateData) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
    await user.update(updateData);
    return user;
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getUserProfileByUserName
};
