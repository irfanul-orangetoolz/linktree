const { SocialMediaAccount } = require('../models');

// Connect a social media account
const connectSocialAccount = async (userId, platform, accessToken) => {
    const social = new SocialMediaAccount({
        platform,
        user_id: userId,
        access_token: accessToken
    });
    await social.save();
    return social
};

// Retrieve connected social media accounts
const getSocialAccounts = async (userId) => {
    return await SocialMediaAccount.findAll({ where: { user_id: userId } });
};

// Fetch social media data (dummy data for now, replace with API fetch if needed)
const getSocialData = async (socialId) => {
    const socialAccount = await SocialMediaAccount.findByPk(socialId);
    if (!socialAccount) {
        throw new Error('Social account not found');
    }
    return {
        platform: socialAccount.platform,
        followerCount: socialAccount.follower_count || 0,
        totalViews: socialAccount.total_views || 0,
        engagementMetrics: socialAccount.engagement_metrics || {}
    };
};

// Disconnect a social media account
const disconnectSocialAccount = async (socialId) => {
    const socialAccount = await SocialMediaAccount.findByPk(socialId);
    if (!socialAccount) {
        throw new Error('Social account not found');
    }
    await socialAccount.destroy();
};

module.exports = {
    connectSocialAccount,
    getSocialAccounts,
    getSocialData,
    disconnectSocialAccount
};
