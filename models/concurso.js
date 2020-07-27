"use strict";
let Sequelize = require("sequelize");
module.exports = app => {

    let sequelize = app.db.connection;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;
 
    let Student = null;

    var Concurso = sequelize.define("concursos", {  
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
        createdat: {
            type: Sequelize.DATE
        },
        updatedat: {
            type: Sequelize.DATE
        }
    },
    {
        tableName: "socioconcursos",
        timestamps: true
    });

    function initializeModel(){
       console.log("Concursos -------------------------------------- :)");
        
        Student = app.models.student.Student;
        Concurso.hasMany(Student,{foreignKey:"concursocode",sourceKey:"code"});
    }
    function create(params){
        return Concurso.create(params);
    }

    function destroy(id){
        return Concurso.destroy({where:{id:id}});
    }

    function getall(){
        return Concurso.findAll();
    }
    
    function getConcursoById(params){
            return Concurso.findById(params.couponId);
    }
    function getConcursoDetailsByCode(code){
        return Concurso.findAll({
            where:{
                code:code
            }
        })
    }
    function editConcurso(data){
        return Concurso.update({
            name:data.name
//            ,
//            code:data.code
        },{where:{id:data.id}});
    }

    return {
        Concurso,
        initializeModel,
        create,
        destroy,
        getall,
        getConcursoById,
        getConcursoDetailsByCode,
        editConcurso
    };
};
