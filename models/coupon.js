"use strict";
let Sequelize = require("sequelize");
module.exports = app => {

    let sequelize = app.db.connection;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;
    let User = null;
    let Student = null;
    let Concurso = null;

    var Coupon = sequelize.define("coupons", {  
        id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
        },
        code: {
            type: Sequelize.STRING
        },
        count: {
            type: Sequelize.STRING
        },
        name: {
                type: Sequelize.STRING
        },
        percent: {
            type: Sequelize.INTEGER
        },
        grade:{
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        details: {
                type: Sequelize.TEXT
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
        concursoCode:{
            type:Sequelize.STRING
        }
    },
    {
        tableName: "coupons",
        timestamps: true
    });

    function initializeModel(){
        User = app.models.user.User;
        Student = app.models.student.Student;
        Concurso = app.models.concurso.Concurso;
        Coupon.hasMany(Student,{foreignKey:"couponCode",sourceKey:"code"});
        Coupon.belongsTo(Concurso,{foreignKey:"concursoCode",targetKey:"code"});
    }

    function getAllCoupons(data){
        return Coupon.findAll();
    }

    function getCouponById(params){
            return Coupon.findById(params.couponId);
    }

 
    function createCoupon(params,userId){
        params.userId = userId;
        return Coupon.create(params);
    }

    function updateCoupon(params){        
        return Coupon.update(params,{
            where:{
                id:params.id
            }
        })
    }

    function deleteCoupon(params){
        return Coupon.destroy({
            where:{
                id:params.id
            }
        })
    }

    function getCouponDetailsByCode(code){
        console.log("Tochi  model coupons - getCouponDetailsByCode paso 1:"+code);
        return Coupon.findAll({
            where:{
                code:code
            }
        })
    }

    
   function findByConcurso(params ){
       console.log("Tochi  model coupons - findByConcurso paso 1:"+params.concursoCode);
        return Coupon.findAll(
            {
                where:{concursoCode:params.concursoCode}}
            )
    }

    return {
        Coupon,
        initializeModel,
        getAllCoupons,
        getCouponById,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        getCouponDetailsByCode,
        findByConcurso
    };
};
