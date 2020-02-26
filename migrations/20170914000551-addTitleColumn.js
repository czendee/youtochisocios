'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn({
        tableName: 'students',
      },
      'title',
      Sequelize.STRING
    );
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.removeColumn(
     'students',
     'title');
  }
};
