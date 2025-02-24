// Sequelize Models for Linktree Backend

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    
    class Link extends Model {
        static associate(models) {
            Link.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    Link.init(
        {
            link_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            user_id: DataTypes.UUID,
            title: DataTypes.STRING,
            url: DataTypes.STRING,
            priority: { type: DataTypes.INTEGER, defaultValue: 0 },
            is_archived: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        {
            sequelize,
            modelName: 'Link',
            underscored: true,
        },
    );

   
    return Link
};
