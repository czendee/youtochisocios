"use strict";
let Sequelize = require("sequelize");
let bcrypt = require('bcrypt-nodejs');
let SALT_WORK_FACTOR = 12;
module.exports = app => {

    let sequelize = app.db.connection;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;

    

    var User = sequelize.define("users", {  
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
        createdat: {
            type: Sequelize.DATE
        },
        updatedat: {
            type: Sequelize.DATE
        },
        role: {
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
        grade: {
            type: Sequelize.INTEGER
        },
        marked: {
            type: Sequelize.TEXT
        }
    },
    {
        tableName: "sociousers",
        timestamps: true,
        instanceMethods: {
            generateHash: function(password){
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },

            validPassword: function(password){
                console.log(bcrypt);
                return bcrypt.compareSync(password, this.password);
            },
            toJSON: function () {
                console.log("tojson");
              var values = Object.assign({}, this.get());
              delete values.password;
              return values;
            }
        }
    });

    User.beforeCreate(function(user, options) {
        var hashedPw = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
        user.password = hashedPw;
    });


    function getUser(id){
            console.log("working in getme model");
            return User.findById(id);
    }



    function getAllUsers(){
        return User.findAll()
    }

 

    function findByEmail(email){
        return User.findAll(
            {
                where:{email:email}}
            )
    }

    function addNewUser(data){
        return new Promise((resolve,reject)=>{
            User.findAll({where:{email:data.email}}).then(user=>{
                if(user.length>1){
                    console.log("user exists")
                    return reject("user already exists");
                }
                else
                {
                    return User.create({
                        email:data.email,
                        name:data.name,
                        lastname:data.lastname,
                        role:data.role,
                        password:data.password,
                        grade:data.grade
                    }).then(newuser=>{
                        return resolve(newuser);
                    })
                }
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function getAllTeachers(){
        return User.findAll({where:{role:"teacher"}});
    }

    function getAllTeachersByGrade(grade){
        return User.findAll({where:{role:"teacher",grade:grade}});
    }

    function editUser(data){
        return User.update({
            name:data.name,
            lastname:data.lastname,
            role:data.role,
            grade:data.grade
        },{where:{id:data.id}});
    }

    function deleteUser(id){
        return User.destroy({
            where:{id:id}
        });
    }

    function setMarked(studentId,user){
        return new Promise((resolve,reject)=>{
            User.findById(user.id).then(userData=>{
                var markedArray = [];
                if(userData.marked){
                    if(JSON.parse(userData.marked) instanceof Array){
                        markedArray = JSON.parse(userData.marked);
                    }
                }
                markedArray.push(studentId);
                user.update({
                    marked:JSON.stringify(markedArray)
                },{
                    where:{
                        id:user.id
                    }
                }).then(data=>{
                    return resolve(data);
                }).catch(err=>{
                    return reject(err);
                })
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function initializeModel(){

    }

    return {
        User,
        getUser,
        getAllUsers,
        deleteUser,
        findByEmail,
        addNewUser,
        editUser,
        deleteUser,
        getAllTeachers,
        setMarked,
        initializeModel,
        getAllTeachersByGrade
    };
};
