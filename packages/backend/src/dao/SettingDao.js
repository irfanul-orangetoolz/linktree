/* eslint-disable class-methods-use-this */
const models = require('../models');
const SuperDao = require('./SuperDao');

const Setting = models.settings;

class SettingDao extends SuperDao {
    constructor() {
        super(Setting);
    }
}

module.exports = SettingDao;