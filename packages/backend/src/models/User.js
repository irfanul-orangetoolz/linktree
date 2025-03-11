// Sequelize Models for Linktree Backend

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.SocialMediaAccount, { foreignKey: 'user_id' });
            User.hasMany(models.Link, { foreignKey: 'user_id' });
            User.hasOne(models.Setting, { foreignKey: 'user_id' });
            User.hasMany(models.Analytic, { foreignKey: 'user_id' });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            email: DataTypes.STRING,
            password_hash: DataTypes.STRING,
            name: DataTypes.STRING,
            bio: DataTypes.TEXT,
            profile_image_url: DataTypes.STRING,
            user_name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            underscored: true,
        },
    );

    

    return  User;
};
