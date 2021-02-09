"use strict";

let router = require("express").Router();

module.exports = app => {
    let passport = app.auth.passport;
    let adminController = app.controllers.adminController;
    let studentController = app.controllers.studentController;

    
    router.route("/").get((req,res,next)=>{
        console.log("tochi  ............in the main root futurorobot\ page 1");
        res.render("futurorobot");
        //studentController.checkAndRegisterStudent(req,res,next);
        console.log("tochi  ............in the main root futurorobot\ page 2");
    })


    
    return router;
};
