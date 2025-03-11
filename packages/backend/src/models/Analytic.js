// Sequelize Models for Linktree Backend

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Analytic extends Model {
        static associate(models) {
            Analytic.belongsTo(models.User, { foreignKey: 'id' });
            Analytic.belongsTo(models.Link, { foreignKey: 'link_id' });
        }
    }
    Analytic.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: DataTypes.UUID,
            event_type: DataTypes.STRING,
            link_id: DataTypes.INTEGER,
            timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
        },
        {
            sequelize,
            modelName: 'Analytic',
            underscored: true
        }
    );

    return Analytic;
};
