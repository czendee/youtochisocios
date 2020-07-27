"use strict";
let Sequelize = require("sequelize");
module.exports = app => {

    let sequelize = app.db.connection;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;

    var Schools = sequelize.define("schools", {  
        id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        createdat: { 
            type: Sequelize.DATE
        },
        updatedat: {
            type: Sequelize.DATE
        }
    },
    {
        tableName: "socioschools",
        timestamps: true
    });

    function create(params){
        return Schools.create(params);
    }

    function destroy(id){
        return Schools.destroy({where:{id:id}});
    }

    function getall(){
        console.log("tochi 004: models schools   getall");
        return Schools.findAll();
    }

    return {
        Schools,
        create,
        destroy,
        getall
    };
};
