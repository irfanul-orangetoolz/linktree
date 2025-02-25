// const UserService = require('../services/userService');

// class UserController {
//   constructor() {
//     this.userService = new UserService();
//   }

//   async getUser(req, res) {
//     try {
//       const userId = req.params.user_id;
//       const user = await this.userService.getUserById(userId);
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   async updateUserProfile(req, res) {
//     try {
//       const userId = req.params.user_id;
//       const updateData = req.body;
//       const user = await this.userService.updateUser(userId, updateData);
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   async deleteUserProfile(req, res) {
//     try {
//       const userId = req.params.user_id;
//       const result = await this.userService.      const SocialAccountDao = require('../dao/SocialAccountDao'); // Assuming you have a SocialAccountDao for database operations

//       class SocialService {
//         constructor() {
//           this.socialAccountDao = new SocialAccountDao();
//         }

//         async connectSocialAccount(userId, platform, accessToken) {
//           const socialAccount = await this.socialAccountDao.create({ userId, platform, accessToken });
//           return socialAccount;
//         }

//         async getSocialAccounts(userId) {
//           return await this.socialAccountDao.findByUserId(userId);
//         }

//         async disconnectSocialAccount(socialId) {
//           return await this.socialAccountDao.deleteById(socialId);
//         }

//         async getSocialData(socialId) {
//           return await this.socialAccountDao.findDataById(socialId);
//         }
//       }

//       module.exports = new SocialService();(userId);
//       res.status(200).json(result);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }
// }

// module.exports = UserController;
