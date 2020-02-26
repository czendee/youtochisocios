'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn({
            tableName: 'students',
          },
          'evaluation1Teacher',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'evaluation2Teacher',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'contentCriteria1A',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'contentCriteria2A',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'contentCriteria3A',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'contentCriteria4A',
          Sequelize.INTEGER
        ),

        queryInterface.addColumn({
            tableName: 'students',
          },
          'contentCriteria1B',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'contentCriteria2B',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'contentCriteria3B',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'contentCriteria4B',
          Sequelize.INTEGER
        ),

        queryInterface.addColumn({
            tableName: 'students',
          },
          'draftingCriteria1A',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'draftingCriteria2A',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'draftingCriteria1B',
          Sequelize.INTEGER
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'draftingCriteria2B',
          Sequelize.INTEGER
        ),

        queryInterface.addColumn({
            tableName: 'users',
          },
          'grade',
          Sequelize.STRING
        ),
        queryInterface.addColumn({
            tableName: 'users',
          },
          'marked',
          Sequelize.TEXT
        ),
        queryInterface.changeColumn(
          'students',
          'comments',
          {type: Sequelize.TEXT}
        )
      ])
    
    
    

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
