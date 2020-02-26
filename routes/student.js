"use strict";

let router = require("express").Router();

module.exports = app => {
    let studentController = app.controllers.studentController;
    let passport = app.auth.passport;

    router.route("/register").post((req,res,next)=>{
        studentController.checkAndRegisterStudent(req,res,next);
    })

    router.route("/login").post(passport.authenticate(
            'local-login',
            {   successRedirect: '/essay',
                failureRedirect: '/login',
                failureFlash: true 
            }
        )
    )

    router.route("/update-essay").post((req,res,next)=>{
        studentController.updateEssay(req,res,next);
    })

    router.route("/edit-profile").get(isLoggedIn, (req,res,next)=>{
        
        studentController.renderEditProfile(req,res,next);
        
        
    })

    router.route("/update").post(isLoggedIn, (req,res,next)=>{
        
            studentController.updateStudentData(req,res,next);
        
    })

    router.route("/send-essay").post(isLoggedIn, (req,res,next)=>{
        studentController.sendEssay(req,res,next);
    })

    function isLoggedIn(req,res,next){
        if(!req.user){
            res.redirect("/login");
        }
        else
        {
            next();
        }
    }

    router.route("/change-coupon").post((req,res,next)=>{
        studentController.updateUserCouponAndReload(req,res,next);
    })

    router.route("/check-full-discount").post((req,res,next)=>{
        studentController.checkFullDiscountAndRedirect(req,res,next);
    })


    

    return router;
};


