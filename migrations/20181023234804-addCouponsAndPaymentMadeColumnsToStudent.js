'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
          queryInterface.addColumn({
              tableName: 'students',
            },
            'paymentMade',
            Sequelize.BOOLEAN
          ),

          queryInterface.addColumn({
              tableName: 'students',
            },
            'paymentStatus',
            Sequelize.STRING
          ),

          queryInterface.addColumn({
              tableName: 'students',
            },
            'transactionId',
            Sequelize.INTEGER
          ),

          queryInterface.addColumn({
              tableName: 'students',
            },
            'couponCode',
            Sequelize.STRING
          ),
          queryInterface.createTable('coupons', {
              id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
              },
              code: {
                  type: Sequelize.STRING
              },
              count: {
                  type: Sequelize.STRING
              },
              name: {
                  type: Sequelize.STRING
              },
              percent: {
                  type: Sequelize.INTEGER
              },
              userId: {
                  type: Sequelize.INTEGER
              },
              details: {
                  type: Sequelize.TEXT
              },
              createdAt: {
                  type: Sequelize.DATE
              },
              updatedAt: {
                  type: Sequelize.DATE
              },
              status: {
                  type: Sequelize.STRING
              }
          },
          {
              tableName: "coupons",
              timestamps: true
          })
      ])
    


    


  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.removeColumn(
          'students',
          'paymentMade'),
        queryInterface.removeColumn(
          'students',
          'paymentStatus'),
        queryInterface.removeColumn(
          'students',
          'transactionId'),
        queryInterface.removeColumn(
          'students',
          'couponCode'),
        queryInterface.dropTable('coupons')
      ])
     

  }
};
