'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('products', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        image_url: {
          type: Sequelize.STRING
        },
        is_enabled: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        published_date: {
          type: Sequelize.DATE,
        },
        user_id: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      }, { transaction });

      await queryInterface.addConstraint('products',
        {
          type: 'foreign key',
          name: 'users_product_id_fk',
          fields: ['user_id'],
          references: {
            table: 'users',
            field: 'id',
          },
        },
        { transaction }
      )
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('products', { transaction })
    })
  }
};
