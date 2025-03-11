'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.addColumn("social_media_accounts", "meta_data", {
              type: Sequelize.SMALLINT,
             allowNull: true,
          
        });
   await queryInterface.addColumn("social_media_accounts", "expirein", {
              type: Sequelize.DATE,
             allowNull: true,
          
   });
    await queryInterface.addColumn("social_media_accounts", "data_expirein", {
              type: Sequelize.DATE,
             allowNull: true,
          
        });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('social_media_accounts','meta_data')
    await queryInterface.removeColumn('social_media_accounts','expirein')
    await queryInterface.removeColumn('social_media_accounts','data_expirein')
  }
};
