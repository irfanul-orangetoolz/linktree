// Sequelize Migration for Settings Table

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('settings', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: Sequelize.UUID,
                unique: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            theme: {
                type: Sequelize.STRING(10),
                defaultValue: 'light',
                allowNull: false
            },
            background_color: {
                type: Sequelize.STRING(7),
                defaultValue: '#FFFFFF',
                allowNull: false
            },
            button_style: {
                type: Sequelize.STRING(20),
                defaultValue: 'rounded',
                allowNull: false
            },
            show_branding: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('settings');
    }
};
