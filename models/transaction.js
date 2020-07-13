"use strict";
let Sequelize = require("sequelize");
module.exports = app => {

    let sequelize = app.db.connection;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;
    let User = null;
    let Student = null;
    let Coupon = null;

    var Transaction = sequelize.define("transactions", {  
        id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
        },
        createdat: {
            type: Sequelize.DATE
        },
        updatedat: {
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
        },
        studentId: {
            type: Sequelize.INTEGER
        }
    },
    {
        tableName: "transactions",
        timestamps: true
    });

    function initializeModel(){
        User = app.models.user.User;
        Student = app.models.student.Student;
        Coupon = app.models.coupon.Coupon;
        Transaction.belongsTo(Student,{foreignKey:"studentId"});
    }

    function getAllTransactions(data){
        return Transaction.findAll({
            include:[{model:Student,required:false,include:[{model:Coupon, required:false}]}]
        });
    }

    function getTransactionById(params){
        return Transaction.findById(params.id);
    }

    function create(params){
        var studentId = parseInt(params.reference.replace('LeescubreloRegFee',''))
        params.transactionId = params.id;
        params.studentId = studentId;
        delete params["id"];
        return Transaction.create(params);
    }

    function update(params){
        return Transaction.update(params,{
            where:{
                id:params.id
            }
        })
    }



    return {
        Transaction,
        initializeModel,
        getAllTransactions,
        getTransactionById,
        create,
        update 
    };
};
