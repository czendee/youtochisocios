"use strict";

module.exports = app => {

    let Student = app.models.student;
    let errorFormatter = app.helpers.errorFormatter;
    let User = app.models.user;
    let mailService = app.services.mailService
    let Coupon = app.models.coupon;
    let Concurso = app.models.concurso;
    let Transaction = app.models.transaction;
    
    function checkAndRegisterStudent(data){
        return new Promise((resolve,reject)=>{
            console.log("TOCHI  new student, the school step 1:"+data.school);
            if(data.school=="other"){
                console.log("TOCHI  new student, the school step 2");
                data.school=data.customSchool;
                console.log("TOCHI  new student, the school step 3:"+data.school);
//                delete data.customSchool
            }
            if(data.password != data.repeatPassword){
                return reject("La contraseña y la contraseña de repetición no coinciden");
            }


            
            Student.checkStudentBeforeRegister(data).then(details=>{
                console.log(details);
                if(details.length>0){
                    return reject("El estudiante con este CURP o correo electrónico ya existe");
                }
                else
                {
                     if(data.coupon){
                            //start:logic for cupon /concurso validation
                             console.log("TOCHI  new student, the coupon validation  step 1:"+data.coupon);
                            Coupon.getCouponDetailsByCode(data.coupon).then(coupons=>{
                                console.log("TOCHI  new student, the coupon validation  step 2");
                                if(coupons.length>0){
                                    console.log("TOCHI  new student, the coupon validation  step 3");
                                    var couponDetails = coupons[0];
                                    if(couponDetails.concursocode==data.concurso){
                                        console.log("TOCHI  new student, the coupon validation  step 4");
                                        if(couponDetails.grade==data.grade){
                                             console.log("TOCHI  new student, the coupon validation  step 5");
                                            //start:logic original for create new registration of a user 
                                            Student.createNewRegistration(data).then(data=>{
                                                console.log("TOCHI  new student, the coupon validation  step 6: OK to register");
                                                mailService.sendRegistrationMail(data.email,data.name);
                                                return resolve(data);
                                            }).catch(err=>{
                                                return reject(err);
                                            })
                                            //start:logic original for create new registration of a user 
                                        }
                                        else
                                        {
                                            console.log("TOCHI  new student, the coupon validation  step 7:error  grade no ok");
                                            return reject("cupon no pertenece a este grado");
                                        }

                                    }
                                    else
                                    {
                                        console.log("TOCHI  new student, the coupon validation  step 7:error concurso no ok");
                                        return reject("cupon no pertenece a este concurso");
                                    }
                                }
                                else
                                {
                                    console.log("TOCHI  new student, the coupon validation  step 7:error  cuopon no ok");
                                    return reject("cupon no existe");
                                }
                            })
                            //end:logic for cupon /concurso validation 

                     }else{//else paso cupon como param
                                            //start:logic original for create new registration of a user 
                                            Student.createNewRegistration(data).then(data=>{
                                                mailService.sendRegistrationMail(data.email,data.name);
                                                return resolve(data);
                                            }).catch(err=>{
                                                return reject(err);
                                            })
                                            //start:logic original for create new registration of a user                          
                     }    

                }
            })
            
        }) 
    }

    function updateEssay(data, userId){
        return new Promise((resolve,reject)=>{
            Student.updateEssay(data, userId).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        });
    }

    function getAllStudents(){
        return new Promise((resolve,reject)=>{
            Student.getAllStudents().then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
        
    }

    function updateStudentData(data,userId){
        return new Promise((resolve,reject)=>{
            
            Student.updateStudentData(data,userId).then(data=>{
                console.log("updated");
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
            
        
        })
        
    }

    function getStudentById(id){
        return new Promise((resolve,reject)=>{
            console.log(id);
            console.log("student getting by id");
            Student.getStudentById(id).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function evaluateByModerator(data,user){
        return new Promise((resolve,reject)=>{
            Student.evaluateByModerator(data,user).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function sendEssay(user){
        return new Promise((resolve,reject)=>{
            Student.sendEssay(user).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function rejectEssay(data,user){
        return new Promise((resolve,reject)=>{
            Student.rejectEssay(data,user).then(details=>{
                mailService.sendRejectedMail(details.email, details.name)
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function getApprovedEssays(user){
        return Student.getApprovedEssays(user);
    }

    function evaluateEssay(params, user){
        return new Promise((resolve,reject)=>{
            Student.evaluateEssay(params, user).then(data=>{
                User.setMarked(params.studentId,user).then(data2=>{
                    return resolve(data2);
                }).catch(err=>{
                    return reject(err);
                })
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function getCouponDetailsByCode(couponcode){
        return Coupon.getCouponDetailsByCode(couponcode);
    }

    function updateUserCouponAndReload(coupon,user){
        return Student.updateUserCouponAndReload(coupon,user);         
        
    }
    
        function getConcursoDetailsByCode(concursocode){
        return Concurso.getConcursoDetailsByCode(concursocode);
    }

    function checkPaymentStatus(user){
        return Student.checkPaymentStatus(user);
    }

    function processTransaction(params){
        //any changes to banwire payment should be changed here since im getting the id of the user from the reference
        return new Promise((resolve,reject)=>{
            Transaction.create(params).then(data=>{
                Student.processTransaction(params,data.id).then(updatedStatus=>{
                    return resolve(updatedStatus);
                }).catch(err=>{
                    console.log(err);
                    return reject(err);
                })
            }).catch(err=>{
                console.log(err);
                return reject(err);
            })
        })
        
    }

    function checkFullDiscountAndRedirect(user){
        return new Promise((resolve,reject)=>{
            Coupon.getCouponDetailsByCode(user.couponCode).then(coupons=>{
                if(coupons.length>0){
                    var couponDetails = coupons[0];
                    if(couponDetails.percent==100){
                        Student.markPayed(user).then(data=>{
                            return resolve("all good");
                        }).catch(err=>{
                            return reject(err);
                        })
                    }
                    else
                    {
                        return reject("coupon is not 100% free");
                    }
                }
                else
                {
                    return reject("coupon does not exist");
                }
            })

        })
    }

    return{
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
        processTransaction,
        checkFullDiscountAndRedirect
    }
}
