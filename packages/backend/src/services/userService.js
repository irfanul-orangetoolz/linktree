const UserDao = require('../dao/UserDao'); // Assuming you have a UserDao for database operations

class UserService {
  constructor() {
    this.userDao = new UserDao();
  }

  async getUserById(userId) {
    return await this.userDao.findById(userId);
  }

  async updateUser(userId, updateData) {
    return await this.userDao.updateWhere(updateData,{user_id:userId});
  }

  async deleteUser(userId) {
    return await this.userDao.deleteByWhere({user_id: userId});
  }
}

module.exports = UserService;