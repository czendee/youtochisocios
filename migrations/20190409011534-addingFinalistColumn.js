'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn({
               tableName: 'students',
           },
           'finalist',
           Sequelize.BOOLEAN
       ),
         queryInterface.createTable('concursos', {
            id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER
            },
            code: {
                type: Sequelize.STRING
            },           
            name: {
                type: Sequelize.STRING
            },
            tipo: {
                type: Sequelize.STRING
            },  
            textoregla: {
                type: Sequelize.TEXT
            },           
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
            },
            {
              tableName: "concursos",
              timestamps: true
            }
          ),
          queryInterface.addColumn({
                   tableName: 'students',
                  },
                'concursoCode',
                 Sequelize.STRING
 
          ),
          queryInterface.addColumn({
                   tableName: 'coupons',
                  },
                'concursoCode',
                 Sequelize.STRING
 
          )      
      ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.removeColumn(
          'students',
          'finalist'
          ),
        queryInterface.dropTable('concursos'),
        queryInterface.removeColumn(
          'students',
          'concursoCode'
        ),
        queryInterface.removeColumn(
          'coupons',
          'concursoCode'
        )      
      ])
  }
};
