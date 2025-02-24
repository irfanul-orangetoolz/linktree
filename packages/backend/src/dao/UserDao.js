/* eslint-disable class-methods-use-this */
const models = require('../models');
const SuperDao = require('./SuperDao');

const User = models.users;

class UserDao extends SuperDao {
    constructor() {
        super(User);
    }
}

module.exports = UserDao;