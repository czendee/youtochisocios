"use strict";

let { Parser } = require('json2csv');



module.exports = app => {

    let User = app.models.user;
    let Coupon = app.models.coupon;
    let Transaction = app.models.transaction;
    let School = app.models.schools;
    let Concurso = app.models.concurso;    
    let Student = app.models.student;

    function addNewUser(data){
        return User.addNewUser(data)
    }

    function getAllUsers(){
        return User.getAllUsers();
    }

    function editUser(params){
        return User.editUser(params);
    }

    function deleteUser(id){
        return User.deleteUser(id);
    }

    function getAllTeachers(){
        return User.getAllTeachers();
    }

    function getAllCoupons(data){
        return Coupon.getAllCoupons(data);
    }

    function getCouponById(data){
        return Coupon.getCouponById(data);
    }

    function createCoupon(data,user){
        return Coupon.createCoupon(data,user.id);
    }

    function updateCoupon(data,user){
        return Coupon.updateCoupon(data,user.id);
    }

    function deleteCoupon(data,user){
        return Coupon.deleteCoupon(data,user.id);
    }
    
    function findCouponByConcurso(params){
        console.log("Tochi  adminService findCouponByConcurso paso 1"+ params.concursoCode);
                    
        return Coupon.findByConcurso(params);
    }

    function getAllTransactions(params){
        return Transaction.getAllTransactions(params);
    }

    function getAllSchools(){
        console.log("tochi 003: getAllSchools getall");
        return School.getall();
    }

    function createSchool(params){
        return School.create(params);
    }

    function deleteSchool(schoolId){
        return School.destroy(schoolId);
    }
    
    function getConcursoById(data){
        return Concurso.getConcursoById(data);
    }
    
    function getAllConcursos(){
        return Concurso.getall();
    }

    function createConcurso(params){
        return Concurso.create(params);
    }
    
       function editConcurso(params){
        return Concurso.editConcurso(params);
    }


    function deleteConcurso(concursoId){
        return Concurso.destroy(concursoId);
    }    

    function getFinalists(params){
        return Student.getFinalists(params);
    }

    function setFinalist(params,user){
        return Student.setFinalist(params,user);
    }

    function downloadFinalistReport(req,res,next){
        console.log("im in here");
        //var fieldNames = ['Id','Name','Middle Name','Last Name','Email','School','Grade','curp','entity','title','plagarism','spellingPoints','contentCriteria1A','contentCriteria2A','contentCriteria3A','contentCriteria4A','draftingCriteria1A','draftingCriteria2A','contentCriteria1B','contentCriteria2B','contentCriteria3B','contentCriteria4B','draftingCriteria1B','draftingCriteria2B','couponCode','fouls','finalist','teacher1','teacher2','teacher1Total','teacher2Total','Total'];
        var fields = [{value:'id',label:'Id'},{value:'name',label:'Nombre'},{value:'middlename',label:'Segundo Nombre'},{value:'lastname',label:'Appelido'},{value:'school',label:'Escule'},{value:'email',label:'Correo Electronico'},{value:'grade',label:'Grado'},{value:'curp',label:'CURP'},{value:'entity',label:'Entidad'},{value:'title',label:'Titulo'},{value:'plagarism',label:'Plagarism'},{value:'spellingPoints',label:'spellingPoints'},{value:'evaluation1TeacherModel.name',label:'Teacher1'},{value:'contentCriteria1A',label:'contentCriteria1A'},{value:'contentCriteria2A',label:'contentCriteria2A'},{value:'contentCriteria3A',label:'contentCriteria3A'},{value:'contentCriteria4A',label:'contentCriteria4A'},{value:'draftingCriteria1A',label:'draftingCriteria1A'},{value:'draftingCriteria2A',label:'draftingCriteria2A'},{value:'evaluation2TeacherModel.name',label:'Teacher2'},{value:'contentCriteria1B',label:'contentCriteria1B'},{value:'contentCriteria2B',label:'contentCriteria2B'},{value:'contentCriteria3B',label:'contentCriteria3B'},{value:'contentCriteria4B',label:'contentCriteria4B'},{value:'draftingCriteria1B',label:'draftingCriteria1B'},{value:'draftingCriteria2B',label:'draftingCriteria2B'},{value:'couponCode',label:'couponCode'},{value:'fouls',label:'fouls'},{value:'finalist',label:'finalist'}];


        Student.getFinalistsForDownload().then(students=>{
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(students);
            res.setHeader('Content-disposition', 'attachment; filename=teams.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        })
    }

    

    return {
        addNewUser,
        getAllUsers,
        editUser,
        deleteUser,
        getAllTeachers,
        getAllCoupons,
        getCouponById,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        findCouponByConcurso,
        getAllTransactions,
        getAllSchools,
        createSchool,
        deleteSchool,
        getConcursoById,
        getAllConcursos,
        createConcurso,
        editConcurso,
        deleteConcurso,        
        getFinalists,
        setFinalist,
        downloadFinalistReport
    }
}
