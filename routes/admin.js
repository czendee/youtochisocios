"use strict";

let router = require("express").Router();

module.exports = app => {
    let passport = app.auth.passport;
    let adminController = app.controllers.adminController;
    let studentController = app.controllers.studentController;

    
    router.route("/").get((req,res,next)=>{
        console.log("tochi  ............in the main root \ page 1");
        res.render("admin");
        //studentController.checkAndRegisterStudent(req,res,next);
        console.log("tochi  ............in the main root \ page 2");
    })

    router.route("/login").post(passport.authenticate(
            'admin-login',
            {   successRedirect: '/admin/dashboard',
                failureRedirect: '/admin',
                failureFlash: false 
            }
    ))

    router.route("/user/create").post((req,res,next)=>{
        adminController.addNewUser(req,res,next);
    })

    router.route("/user/edit").post((req,res,next)=>{
        adminController.editUser(req,res,next);
    })

    router.route("/user/delete").post((req,res,next)=>{
        adminController.deleteUser(req,res,next);
    })

    router.route("/user/all").get(isLoggedIn,(req,res,next)=>{
        adminController.getAllUsers(req,res,next);
    })

    router.route("/teacher/all").get(isLoggedIn,(req,res,next)=>{
        adminController.getAllTeachers(req,res,next);
    })

    

    router.route("/essay/approved").get((req,res,next)=>{
        studentController.getApprovedEssays(req,res,next);
    })

    router.route("/students/all").get((req,res,next)=>{
        studentController.getAllStudents(req,res,next);
    })

    router.route("/student").get((req,res,next)=>{
        console.log("working in here in get student");
        studentController.getStudentById(req,res,next);
    })

    router.route("/student/evaluate-essay").post((req,res,next)=>{
        studentController.evaluateEssay(req,res,next);
    })

    router.route("/dashboard").get(checkAdmin,(req,res,next)=>{
        if(req.user){
            if(req.user.curp){
                res.redirect("/");
            }
            else if(req.user.role=="admin" || req.user.role=="teacher"){
                res.cookie('user', encodeURIComponent(JSON.stringify(req.user)))
                res.render("admindashboard", {user:req.user});
            }
            else
            {
                res.redirect("/");
            }
        }
        else
        {
            res.redirect("/admin");
        }
    })

    router.route("/dashboard/*").get(checkAdmin,(req,res,next)=>{
        if(req.user){
            if(req.user.curp){
                res.redirect("/");
            }
            else if(req.user.role=="admin" || req.user.role=="teacher"){
                res.cookie('user', encodeURIComponent(JSON.stringify(req.user)))
                res.render("admindashboard", {user:req.user});
            }
            else
            {
                res.redirect("/");
            }
        }
        else
        {
            res.redirect("/admin");
        }
    })

    function checkAdmin(req,res,next){
        if(req.user){
            if(req.user.role=="admin" || req.user.role=="teacher"){
                next();
            }
            else
            {
                res.redirect("/");
            }
        }
        else
        {
            res.redirect("/admin");
        }
        
    }

    router.route("/student/evalue-moderator").post(isLoggedIn,(req,res,next)=>{
        studentController.evaluateByModerator(req,res,next);
    })

    router.route("/student/evalue-moderator-reject").post(isLoggedIn,(req,res,next)=>{
        studentController.rejectEssay(req,res,next);
    })

    function isLoggedIn(req,res,next){
        if(!req.user){
            res.redirect("/");
        }
        else
        {
            next();
        }
    }

    router.route("/coupons/all").post((req,res,next)=>{
        console.log("im here");
        adminController.getAllCoupons(req,res,next);
    })
    router.route("/coupon").post((req,res,next)=>{
        adminController.getCouponById(req,res,next);
    })
    router.route("/coupon/create").post((req,res,next)=>{
        adminController.createCoupon(req,res,next);
    })
    router.route("/coupon/update").post((req,res,next)=>{
        adminController.updateCoupon(req,res,next);
    })
    router.route("/coupon/delete").post((req,res,next)=>{
        adminController.deleteCoupon(req,res,next);
    })
    
    router.route("/coupon/searchconcurso").post((req,res,next)=>{
        console.log("Tochi  route searchconcurso paso1");
        adminController.findCouponByConcurso(req,res,next);
        console.log("Tochi  route searchconcurso paso2");
    })

    router.route("/transaction-status").post((req,res,next)=>{
        adminController.processTransaction(req,res,next);
    })


    router.route("/transactions/all").post((req,res,next)=>{
        adminController.getAllTransactions(req,res,next);
    })

    router.route("/schools/all").get((req,res,next)=>{
        adminController.getAllSchools(req,res,next);
    })
    router.route("/school/create").post((req,res,next)=>{
        adminController.createSchool(req,res,next);
    })
    router.route("/school/delete").post((req,res,next)=>{
        adminController.deleteSchool(req,res,next);
    })
    
    router.route("/concursos/all").get((req,res,next)=>{
        adminController.getAllConcursos(req,res,next);
    })
    router.route("/concurso/create").post((req,res,next)=>{
        adminController.createConcurso(req,res,next);
    })
    router.route("/concurso/edit").post((req,res,next)=>{
        adminController.editConcurso(req,res,next);
    })
    router.route("/concurso/delete").post((req,res,next)=>{
        adminController.deleteConcurso(req,res,next);
    })    

    router.route("/student/finalists").post((req,res,next)=>{
        adminController.getFinalists(req,res,next);
    })

    router.route("/student/select-finalist").post((req,res,next)=>{
        adminController.setFinalist(req,res,next);
    })

    router.route("/student/finalist-report").get((req,res,next)=>{
        adminController.downloadFinalistReport(req,res,next);
    })

    
    return router;
};


