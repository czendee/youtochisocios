"use strict";

let router = require("express").Router();

module.exports = app => {
    
     let adminService = app.services.adminService;
     let studentService = app.services.studentService;
    
    router.route("/").get((req,res,next)=>{

        if(!req.user){
            res.redirect("/");
        }
        else if(!req.user.paymentMade && req.user.status=="sent"){
            res.redirect("/checkout");
            res.render("checkout",{user:req.user,message:req.flash("message")});
        }
        else
        {
            let dataConcursos = null;
            let dataStudents = null;
            console.log("tochi 102: essay \ page   1.2  antes de  getAllStudent");
            studentService.getAllStudents().then(data=>{
                console.log("tochi 102: essay \ page   1.3.1");
                dataStudents =data;
                console.log("tochi 202:  essay\ page   1.3");
                adminService.getAllConcursos().then(data=>{
                    console.log("tochi 202:   essay \ page   1.3.1");
                    dataConcursos =data;
                     res.render("essay",{user:req.user,concursos:dataConcursos,students:dataStudents});
                    console.log("tochi 202:   essay \ page   1.3.2");
                }).catch(err=>{
                    console.log("tochi 202:   essay \ page   1.3.3");
                    console.log(err);
                    console.log("tochi 102:   essay \ page   1.3.4");
                    next(err);
                    console.log("tochi 202:   essay \ page   1.3.5");
                })                  
                console.log("tochi 102:   essay \ page   1.3.2");            
            }).catch(err=>{
                console.log("tochi 102: essay \ page   1.3.3");
                console.log(err);
                console.log("tochi 102: essay \ page   1.3.4");
                next(err);
                console.log("tochi 102: essay \ page   1.3.5");
            })
            
//            res.render("essay",{user:req.user});

        }
        //studentController.checkAndRegisterStudent(req,res,next);
    })

    
    return router;
};


