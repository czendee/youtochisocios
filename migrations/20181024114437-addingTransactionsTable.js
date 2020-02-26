'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
        id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        status: {
                type: Sequelize.STRING
        },
        event: {
            type: Sequelize.STRING
        },
        auth_code:{
            type: Sequelize.STRING
        },
        reference: {
            type: Sequelize.STRING
        },
        transactionId: {
            type: Sequelize.STRING
        },
        hash: {
            type: Sequelize.TEXT
        },
        total: {
            type: Sequelize.INTEGER
        },
        card_bin: {
            type: Sequelize.STRING
        },
        card_brand: {
            type: Sequelize.STRING
        },
        card_category: {
            type: Sequelize.STRING
        },
        card_type: {
            type: Sequelize.STRING
        },
        card_country: {
            type: Sequelize.STRING
        },
        card_issuer: {
            type: Sequelize.STRING
        },
        cust_fname: {
            type: Sequelize.STRING
        },
        cust_lname: {
            type: Sequelize.STRING
        },
        cust_lname_2: {
            type: Sequelize.STRING
        },
        cust_address: {
            type: Sequelize.TEXT
        },
        cust_city: {
            type: Sequelize.STRING
        },
        cust_state: {
            type: Sequelize.STRING
        },
        cust_zip: {
            type: Sequelize.STRING
        },
        cust_country: {
            type: Sequelize.STRING
        },
        card_last_4: {
            type: Sequelize.STRING
        },
        card_owner: {
            type: Sequelize.STRING
        }
    },
    {
        tableName: "transactions",
        timestamps: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions');
  }
};
