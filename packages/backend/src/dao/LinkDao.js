/* eslint-disable class-methods-use-this */
const models = require('../models');
const SuperDao = require('./SuperDao');

const Link = models.links;

class LinkDao extends SuperDao {
    constructor() {
        super(Link);
    }
}

module.exports = LinkDao;