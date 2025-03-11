const { SocialMediaAccount } = require('../models');
const { getAllUser } = require("./userService");
const loadPMap = async () => {
    const pMap = (await import("p-map")).default;
    return pMap;
};
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

const processSocialMediaAccount = async (account) => {
    console.log(account, "processSocialMediaAccount")
}
const processSocialMediaAccountsByPlatform = async (user, platform, accounts) => {
    try {
        const pMap = await loadPMap()
        console.log(`🔄 Processing ${platform} accounts for user ${user.id}`);

        // ✅ Process each social media account in parallel using `p-map`
        await pMap(accounts, async (account) => {
            await processSocialMediaAccount(account);
        }, { concurrency: 3 });

        console.log(`✅ Finished processing ${platform} accounts for user ${user.id}`);
    } catch (error) {
        console.error(`❌ Error processing ${platform} accounts for user ${user.id}:`, error);
    }
};

const pullSocialAccountsDataByUser = async (user) => {
    try {
        const pMap = await loadPMap()
        // ✅ Fetch all social media accounts for the user
        const socialAccounts = await SocialMediaAccount.findAll({
            where: { user_id: user.id },
            attributes: [
                "id", "user_id", "platform", "access_token",
                "follower_count", "total_views", "engagement_metrics",
                "last_fetched", "created_at", "updated_at",
                "meta_data", "expirein", "data_expirein"
            ],
            raw: true,
        });

        if (socialAccounts.length === 0) {
            console.log(`⚠️ No social accounts found for user ${user.id}`);
            return;
        }

        // ✅ Group accounts by platform
        const groupedByPlatform = socialAccounts.reduce((acc, account) => {
            acc[account.platform] = acc[account.platform] || [];
            acc[account.platform].push(account);
            return acc;
        }, {});

        console.log(`📌 Found ${Object.keys(groupedByPlatform).length} platforms for user ${user.id}`);

        // ✅ Process each platform in parallel using `p-map`
        await pMap(Object.entries(groupedByPlatform), async ([platform, accounts]) => {
            await processSocialMediaAccountsByPlatform(user, platform, accounts);
        }, { concurrency: 3 }); // Adjust concurrency based on API limits

        console.log(`✅ Finished processing social accounts for user ${user.id}`);
    } catch (error) {
        console.error(`❌ Error processing social accounts for user ${user.id}:`, error);
    }
}
const pullSocialAccountsData = async () => {
    const users =await  getAllUser()
    for (const user of users) {
        await pullSocialAccountsDataByUser(user)
    }
}
module.exports = {
    connectSocialAccount,
    getSocialAccounts,
    getSocialData,
    disconnectSocialAccount,
    pullSocialAccountsData
};
