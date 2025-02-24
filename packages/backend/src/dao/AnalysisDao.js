/* eslint-disable class-methods-use-this */
const models = require('../models');
const SuperDao = require('./SuperDao');

const Analysis = models.analytics;

class AnalysisDao extends SuperDao {
    constructor() {
        super(Analysis);
    }
}

module.exports = AgencyDao;