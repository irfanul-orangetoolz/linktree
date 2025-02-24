const SocialAccountDao = require('../dao/SocialMediaAccount'); // Assuming you have a SocialAccountDao for database operations

class SocialService {
  constructor() {
    this.socialAccountDao = new SocialAccountDao();
  }

  async connectSocialAccount(userId, platform, accessToken) {
    const socialAccount = await this.socialAccountDao.create({ user_id: userId, platform, access_token: accessToken });
    return socialAccount;
  }

  async getSocialAccounts(userId) {
    return await this.socialAccountDao.findByWhere({ user_id: userId });
  }

  async disconnectSocialAccount(socialId) {
    return await this.socialAccountDao.deleteByWhere({ social_id: socialId });
  }

  async getSocialData(socialId) {
    return await this.socialAccountDao.findByWhere({ social_id: socialId });
  }
}

module.exports = SocialService;