// Sequelize Migration for Analytics Table

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('analytics', {
      analytic_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onDelete: 'CASCADE'
      },
      event_type: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      link_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'links',
          key: 'link_id'
        },
        onDelete: 'SET NULL'
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('analytics');
  }
};
