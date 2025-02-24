'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the table without partitioning
    await queryInterface.createTable('analytics', {
      analytic_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      event_type: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      link_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Add partitioning by timestamp using raw SQL
    await queryInterface.sequelize.query(`
      ALTER TABLE "analytics"
      PARTITION BY RANGE (timestamp);
    `);

    // Optionally, create partitions manually (e.g., for each year or month)
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "analytics_2025"
      PARTITION OF "analytics"
      FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
    `);

    // You can add additional partitions for other ranges as needed
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the partitions before dropping the main table
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "analytics_2025";
    `);

    await queryInterface.dropTable('analytics');
  }
};
