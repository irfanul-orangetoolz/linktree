// Sequelize Indexes Migration

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addIndex('users', ['email'], {
            name: 'idx_users_email',
            unique: true
        });

        await queryInterface.addIndex('social_media_accounts', ['user_id'], {
            name: 'idx_social_user_id'
        });

        await queryInterface.addIndex('social_media_accounts', ['platform'], {
            name: 'idx_social_platform'
        });

        await queryInterface.addIndex('links', ['user_id'], {
            name: 'idx_links_user_id'
        });

        await queryInterface.addIndex('links', ['user_id', 'priority'], {
            name: 'idx_links_priority'
        });

        await queryInterface.addIndex('analytics', ['user_id'], {
            name: 'idx_analytics_user_id'
        });

        await queryInterface.addIndex('analytics', ['user_id', 'timestamp'], {
            name: 'idx_analytics_timestamp'
        });

        await queryInterface.addIndex('settings', ['user_id'], {
            name: 'idx_settings_user_id'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeIndex('users', 'idx_users_email');
        await queryInterface.removeIndex(
            'social_media_accounts',
            'idx_social_user_id'
        );
        await queryInterface.removeIndex(
            'social_media_accounts',
            'idx_social_platform'
        );
        await queryInterface.removeIndex('links', 'idx_links_user_id');
        await queryInterface.removeIndex('links', 'idx_links_priority');
        await queryInterface.removeIndex('analytics', 'idx_analytics_user_id');
        await queryInterface.removeIndex(
            'analytics',
            'idx_analytics_timestamp'
        );
        await queryInterface.removeIndex('settings', 'idx_settings_user_id');
    }
};
