const SocialService = require('../services/socialService');

class SocialController {
  constructor() {
    this.socialService = new SocialService();
  }

  async connect(req, res) {
    try {
      const { platform, accessToken } = req.body;
      const userId = req.user.id; // Assuming user ID is added to req.user by middleware
      const socialAccount = await this.socialService.connectSocialAccount(userId, platform, accessToken);
      res.status(200).json(socialAccount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAccounts(req, res) {
    try {
      const userId = req.user.id; // Assuming user ID is added to req.user by middleware
      const socialAccounts = await this.socialService.getSocialAccounts(userId);
      res.status(200).json(socialAccounts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async disconnect(req, res) {
    try {
      const socialId = req.params.social_id;
      const result = await this.socialService.disconnectSocialAccount(socialId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getData(req, res) {
    try {
      const socialId = req.params.social_id;
      const socialData = await this.socialService.getSocialData(socialId);
      res.status(200).json(socialData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = SocialController;