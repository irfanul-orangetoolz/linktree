const { SocialMediaAccount } = require('../models');
const { getAllUser } = require("./userService");
const axios = require("axios")
const config = require("../config/config")
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
    const accounts = await SocialMediaAccount.findAll({ where: { user_id: userId } });
    console.log("lllllllllllllllllllll", accounts, userId)
    const socialAccounts = []
    for (const account of accounts) {
        delete account.dataValues.access_token;
        socialAccounts.push(account)
    }
    return socialAccounts
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

const createSocialAccount = async (data, userId) => {
    const socialAccount = {

        access_token: data.authResponse.accessToken,
        platform: data.platform,
        expirein: data.authResponse.expireIn,
        data_expirein: data.authResponse.data_access_expiration_time,
        created_at: new Date(),
        update_at: new Date(),
        user_id:userId
    }
    const newAccount = new SocialMediaAccount(socialAccount)
    newAccount.save()
    return newAccount

}
// Disconnect a social media account
const disconnectSocialAccount = async (socialId) => {
    const socialAccount = await SocialMediaAccount.findByPk(socialId);
    if (!socialAccount) {
        throw new Error('Social account not found');
    }
    await socialAccount.destroy();
};

const pullInstagramData = async (access_token) => {
    try {
        const response = await axios.get("https://graph.instagram.com/v22.0/me", {
            params: {
                fields: "id,username,name,followers_count, profile_picture_url",
                access_token: access_token
            }
        });
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
    
}
const connectInstagram = async (access_token, user_id) => {
    try {
        const instagramData = await pullInstagramData(access_token)
        if (instagramData) {
             const newData = {
                access_token,
                platform: 'instagram',
                follower_count: instagramData.followers_count,
                meta_data: {
                    ...instagramData
                },
                created_at: new Date(),
                update_at: new Date(),
                user_id
             }
            
            const newAccount = new SocialMediaAccount(newData)
            await newAccount.save()
           
            return {...newAccount.dataValues, id:newAccount.id}
        } else {
            return null
        }
       
        

    } catch (error) {
        console.log(error)
    }
}
const instagramOauthTokenExchange = async (body, user) => {
    try {
		const { code, redirectUri } = body
        const {socialIntegrations:{instagram}} = config
		const params = new URLSearchParams({
			client_id: instagram.client_id,
			client_secret: instagram.client_secret,
			grant_type: "authorization_code",
			redirect_uri: redirectUri,
			code
		})

		const response = await axios.post(
			"https://api.instagram.com/oauth/access_token",
			params.toString(),
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        if (response.status === 200) {
            const token = response.data.access_token
            const data = await connectInstagram(token, user.id)
            if (data) {
                
                return data
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (err) {
        console.log(err)
	}
}
const getFacebookUserData = async (access_token) => {
    try {
        
    } catch (error) {
         console.log(error)
    }
}
const connectFacebook = async (tokenData) => {
    try {
          const response = await axios.get("https://graph.facebook.com/v22.0/me", {
            params: {
                fields: "id,name,picture,accounts{followers_count,fan_count,engagement,id,link,page_token,username,likes,name,access_token}",
                access_token: tokenData.access_token
            }
          });
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}
const facebookOauthTokenExchange = async (body, user) => {
    try {
        const { code, redirectUri } = body
        const {socialIntegrations:{facebook}} = config
		const params = new URLSearchParams({
			code,
			redirect_uri: redirectUri,
			client_id: facebook.client_id,
			client_secret: facebook.client_secret
		})

		const response = await axios.post(
			"https://graph.facebook.com/v19.0/oauth/access_token",
			params.toString(),
			// { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        if (response.status === 200) {
            const data = await connectFacebook(response.data)
            if (data) {
                const newAccount = {
                    platform: "facebook",
                    access_token: response.data.access_token,
                    expirein: response.data.expires_in,
                    user_id: user.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                    meta_data: {
                        ...data,
                        tokenData: response.data
                    }
                }
                const account = new SocialMediaAccount(newAccount)
                await account.save()
                return account
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}
const linkedinOauthTokenExchange = async (body, user) => {
    try {
        const { code, redirectUri } = body
        const {socialIntegrations:{linkedin}} = config
		const params = new URLSearchParams({
			grant_type: "authorization_code",
			code,
			redirect_uri: redirectUri,
			client_id: linkedin.client_id,
			client_secret: linkedin.client_secret
		})

		const response = await axios.post(
			"https://www.linkedin.com/oauth/v2/accessToken",
			params.toString(),
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

const updateInstagramData = async (instagramData, id, token) => {
    const newData = {
                access_token:token.access_token,
                follower_count: instagramData.followers_count,
                meta_data: {
                    ...instagramData
                },
                expirein: token.expires_in,
                last_fetched: new Date(),
                updated_at: new Date()
                
            }
    await SocialMediaAccount.update(newData,{where:{id:id}}) 
}
const refreshInstagramAccessToken = async (accessToken) => {
    try {
        const response = await axios.get("https://graph.instagram.com/refresh_access_token", {
            params: {
                grant_type: "ig_refresh_token",
                access_token: accessToken
            }
        });
        if (response.status === 2000) {
            
            return response.data; // { access_token, expires_in }
        }else{
        return {access_token: accessToken, expire_id: null}
            
        }
    } catch (error) {
        console.error("Error refreshing Instagram access token:", error.response?.data || error.message);
        return {access_token: accessToken, expire_id: null}
    }
};
const processSocialMediaAccount = async (account) => {
    const accessToken = account.access_token
    const newToken = await refreshInstagramAccessToken(accessToken)
    const platform = account.platform
    if (platform === "instagram") {
        const instagramData = await pullInstagramData(newToken.access_token)
        if (instagramData) {
            await updateInstagramData(instagramData,account.id, newToken)
        } else {
            console.log("instagram update failed")
        }
    }
    
}
const processSocialMediaAccountsByPlatform = async (user, platform, accounts) => {
    try {
        const pMap = await loadPMap()
        console.log(`🔄 Processing ${platform} accounts for user ${user.id}`);

        // ✅ Process each social media account in parallel using `p-map`
        await pMap(accounts, async (account) => {
            await processSocialMediaAccount(account);
        }, { concurrency: 3 });

        
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


        // ✅ Process each platform in parallel using `p-map`
        await pMap(Object.entries(groupedByPlatform), async ([platform, accounts]) => {
            await processSocialMediaAccountsByPlatform(user, platform, accounts);
        }, { concurrency: 3 }); // Adjust concurrency based on API limits

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
    pullSocialAccountsData,
    createSocialAccount,
    instagramOauthTokenExchange,
    linkedinOauthTokenExchange,
    facebookOauthTokenExchange
};
