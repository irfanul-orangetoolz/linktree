// Sequelize Migration for Links Table

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('links', {
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
            title: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            url: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            priority: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            is_archived: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('links');
    }
};
