// Sequelize Migration for Social Media Accounts Table

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('social_media_accounts', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            platform: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            access_token: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            follower_count: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            total_views: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            engagement_metrics: {
                type: Sequelize.JSONB,
                allowNull: true
            },
            last_fetched: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('social_media_accounts');
    }
};
