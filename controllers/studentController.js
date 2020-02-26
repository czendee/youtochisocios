"use strict";

module.exports = app =>{
    let studentService = app.services.studentService;
    let adminService = app.services.adminService;
    let Coupon = app.models.coupon;
    let passport = app.auth.passport;


    function checkAndRegisterStudent(req,res,next){
        studentService.checkAndRegisterStudent(req.body).then(data=>{
            req.login(data, function (err) {
                            if ( ! err ){
                                res.redirect('/essay');
                            } else {
                                console.log(err);
                            }
                        });
        }).catch(err=>{
            console.log(err);
            req.flash("message",err);
            res.redirect("/");
        })
    }

    function updateEssay(req,res,next){
        studentService.updateEssay(req.body,req.user.id).then(data=>{
            res.redirect("/essay");
        }).catch(err=>{
            next(err);
        })
    }

    function getAllStudents(req,res,next){
        studentService.getAllStudents().then(data=>{
            res.send(data);
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    }

    function updateStudentData(req,res,next){
        studentService.updateStudentData(req.body, req.user.id).then(data=>{
            req.login(req.user, function (err) {
                            if ( ! err ){
                                res.redirect('/student/edit-profile');
                            } else {
                                console.log(err);
                            }
                        });
        })
    }
    function getStudentById(req,res,next){
        studentService.getStudentById(req.query.id).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }
    
    function sendEssay(req,res,next){
        studentService.sendEssay(req.user).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function evaluateByModerator(req,res,next){
        studentService.evaluateByModerator(req.body, req.user).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function rejectEssay(req,res,next){
        studentService.rejectEssay(req.body, req.user).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function getApprovedEssays(req,res,next){
        studentService.getApprovedEssays(req.user).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function evaluateEssay(req,res,next){
        studentService.evaluateEssay(req.body, req.user).then(data=>{
            console.log(data);
            res.send(data);
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    }

    function getCouponDetailsByCode(couponId){
        return studentService.getCouponDetailsByCode(couponId);
    }


    function updateUserCouponAndReload(req,res,next){
        if(req.body.coupon && req.user){
/*original            
            studentService.updateUserCouponAndReload(req.body.coupon,req.user).then(data=>{
                res.redirect("/checkout");
            }).catch(err=>{
                console.log(err);
                next(err);
            })
original */            
                            //start:logic for cupon /concurso validation
                    studentService.getCouponDetailsByCode(req.body.coupon).then(coupons=>{
                        if(coupons.length>0){
                            var couponDetails = coupons[0];
                           if(couponDetails.concursoCode==req.body.concursoparacoupon){
                                
                                if(couponDetails.grade==req.body.gradoparacoupon){

                                    //start:logic original for create new registration of a user 
                                    studentService.updateUserCouponAndReload(req.body.coupon,req.user).then(data=>{
                                        res.redirect("/checkout");
                                    }).catch(err=>{
                                        console.log(err);
                                        next(err);
                                    })                                                                      
                                    //start:logic original for create new registration of a user 
                                }
                                else
                                {
                                    
                                req.flash("message","cupon no pertenece a este grado");
                                res.redirect("/checkout");                                    
                                }
 
                              } //end if the vs concursocode
                              else
                              {                              
                                  req.flash("message","cupon no pertenece a este concurso");
                                  res.redirect("/checkout");                              
                              }
                        }
                        else
                        {
                            req.flash("message","cupon no existe");
                            res.redirect("/checkout");
                            
                        }
                    })
                    //end:logic for cupon /concurso validation 
            
        }
        else
        {
            req.flash("message","Invalid params");
            res.redirect("/checkout");
        }
        
        
    }

    function checkPaymentStatus(req,res,next){
        studentService.checkPaymentStatus(req.user).then(data=>{
            if(data.paymentMade){
                res.redirect("/essay");
            }
            else
            {
                res.render("pending");
            }
        })
    }

    function checkFullDiscountAndRedirect(req,res,next){
        studentService.checkFullDiscountAndRedirect(req.user).then(data=>{
            res.redirect("/essay");
        }).catch(err=>{
            req.flash("message",err);
            res.redirect("/checkout");
        })
    }

    function renderEditProfile(req,res,next){
        adminService.getAllSchools().then(data=>{
            res.render("editProfile", {user:req.user, schools:data});
        })
    }

    return {
        checkAndRegisterStudent,
        updateEssay,
        getAllStudents,
        updateStudentData,
        getStudentById,
        evaluateByModerator,
        sendEssay,
        rejectEssay,
        getApprovedEssays,
        evaluateEssay,
        getCouponDetailsByCode,
        updateUserCouponAndReload,
        checkPaymentStatus,
        checkFullDiscountAndRedirect,
        renderEditProfile
    }
}
