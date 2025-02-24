/* eslint-disable class-methods-use-this */
const models = require('../models');
const SuperDao = require('./SuperDao');

const SocialMediaAccount = models.social_media_accounts;

class SocialMediaAccountDao extends SuperDao {
    constructor() {
        super(SocialMediaAccount);
    }
}

module.exports = SocialMediaAccountDao;