'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.addColumn({
            tableName: 'students',
          },
          'comments',
          Sequelize.STRING
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'plagarism',
          Sequelize.STRING
        ),
        queryInterface.addColumn({
            tableName: 'students',
          },
          'spellingPoints',
          Sequelize.STRING
        )
      ])
    
   
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.removeColumn(
          'students',
          'comments'),
        queryInterface.removeColumn(
          'students',
          'plagarism'),
        queryInterface.removeColumn(
          'students',
          'spellingPoints')
      ])
    
    
  }
};
