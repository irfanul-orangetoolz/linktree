// Sequelize Models for Linktree Backend

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    

    class SocialMediaAccount extends Model {
        static associate(models) {
            SocialMediaAccount.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    SocialMediaAccount.init(
        {
            social_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            user_id: DataTypes.UUID,
            platform: DataTypes.STRING,
            access_token: DataTypes.STRING,
            follower_count: DataTypes.INTEGER,
            total_views: DataTypes.INTEGER,
            engagement_metrics: DataTypes.JSONB,
            last_fetched: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'SocialMediaAccount',
            underscored: true,
        },
    );

    

    return SocialMediaAccount
};
