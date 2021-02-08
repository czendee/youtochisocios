"use strict";

let router = require("express").Router();

module.exports = app => {
    let passport = app.auth.passport;
    let adminController = app.controllers.adminController;
    let studentController = app.controllers.studentController;

    
    router.route("/").get((req,res,next)=>{
        console.log("tochi  ............in the main root futuros\ page 1");
        res.render("futuros");
        //studentController.checkAndRegisterStudent(req,res,next);
        console.log("tochi  ............in the main root futuros\ page 2");
    })


    
    return router;
};
