'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students').then(data=>{
        return queryInterface.createTable('students', {
                id: {
                      allowNull: false,
                      autoIncrement: true,
                      primaryKey: true,
                      type: Sequelize.INTEGER
                },
                email: {
                    type: Sequelize.STRING
                },
                password: {
                    type: Sequelize.STRING
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
                essay: {
                        type: Sequelize.TEXT
                },
                curp: {
                        type: Sequelize.STRING
                },
                name: {
                    type: Sequelize.STRING
                },
                middlename: {
                    type: Sequelize.STRING
                },
                lastname: {
                    type: Sequelize.STRING
                },
                school:{
                    type:Sequelize.STRING
                },
                entity:{
                    type:Sequelize.STRING
                },
                grade:{
                    type:Sequelize.INTEGER
                },
                comments:{
                    type:Sequelize.TEXT
                },
                plagarism:{
                    type:Sequelize.STRING
                },
                spellingPoints:{
                    type:Sequelize.INTEGER
                },
                title:{
                    type:Sequelize.STRING
                },
                evaluation1Teacher:{
                    type:Sequelize.INTEGER
                },
                evaluation2Teacher:{
                    type:Sequelize.INTEGER
                },
                contentCriteria1A:{
                    type:Sequelize.INTEGER
                },
                contentCriteria2A:{
                    type:Sequelize.INTEGER
                },
                contentCriteria3A:{
                    type:Sequelize.INTEGER
                },
                contentCriteria4A:{
                    type:Sequelize.INTEGER
                },
                contentCriteria5A:{
                    type:Sequelize.INTEGER
                },          
                draftingCriteria1A:{
                    type:Sequelize.INTEGER
                },
                draftingCriteria2A:{
                    type:Sequelize.INTEGER
                },
                draftingCriteria3A:{
                    type:Sequelize.INTEGER
                },          
                contentCriteria1B:{
                    type:Sequelize.INTEGER
                },
                contentCriteria2B:{
                    type:Sequelize.INTEGER
                },
                contentCriteria3B:{
                    type:Sequelize.INTEGER
                },
                contentCriteria4B:{
                    type:Sequelize.INTEGER
                },
                contentCriteria5B:{
                    type:Sequelize.INTEGER
                },          
                draftingCriteria1B:{
                    type:Sequelize.INTEGER
                },
                draftingCriteria2B:{
                    type:Sequelize.INTEGER
                },
                draftingCriteria3B:{
                    type:Sequelize.INTEGER
                },          
                paymentMade:{
                    type:Sequelize.BOOLEAN
                },
                paymentStatus:{
                    type:Sequelize.STRING
                },
                transactionId:{
                    type:Sequelize.INTEGER
                },
                couponCode:{
                    type:Sequelize.STRING
                }
            },
            {
                tableName: "students",
                timestamps: true,
                charset: 'utf8',
                collate: 'utf8_general_ci'
            });
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
