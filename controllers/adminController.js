"use strict";

module.exports = app => {

    let adminService = app.services.adminService;
    let studentService = app.services.studentService;

    function addNewUser(req,res,next){
        adminService.addNewUser(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function getAllUsers(req,res,next){
        adminService.getAllUsers().then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function editUser(req,res,next){
        adminService.editUser(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function deleteUser(req,res,next){
        adminService.deleteUser(req.body.id).then(data=>{
            res.send(true);
        }).catch(err=>{
            next(err);
        })
    }

    function getAllTeachers(req,res,next){
        adminService.getAllTeachers().then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function getAllCoupons(req,res,next){
        adminService.getAllCoupons(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function getCouponById(req,res,next){
        adminService.getCouponById(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function createCoupon(req,res,next){
        adminService.createCoupon(req.body,req.user).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function updateCoupon(req,res,next){
        adminService.updateCoupon(req.body,req.user).then(data=>{
            res.send(data.toString());
        }).catch(err=>{
            next(err);
        })
    }

    function deleteCoupon(req,res,next){
        adminService.deleteCoupon(req.body,req.user).then(data=>{
            res.send(data.toString());
        }).catch(err=>{
            next(err);
        })
    }

    
    
    
    function findCouponByConcurso(req,res,next){
        console.log("Tochi  adminController findCouponByConcurso paso1");
        
        adminService.findCouponByConcurso(req.body).then(data=>{
            console.log("Tochi  adminController findCouponByConcurso paso3");
            res.send(data);
        }).catch(err=>{
            console.log("Tochi  adminController findCouponByConcurso error");
            next(err);
        })
        console.log("Tochi  adminController findCouponByConcurso  paso2");
    }    
    
    function processTransaction(req,res,next){
         console.log("Carlos Z call the new BWPay   processTransaction paso1");
        console.log(JSON.parse(req.body));
        console.log("Carlos Z call the new BWPay   processTransaction paso3");
        studentService.processTransaction(req.body).then(data=>{
            res.send("thanks");
        })
    }

    function getAllTransactions(req,res,next){
        return adminService.getAllTransactions(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function getAllSchools(req,res,next){
        adminService.getAllSchools().then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function createSchool(req,res,next){
        adminService.createSchool(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function deleteSchool(req,res,next){
        adminService.deleteSchool(req.body.id).then(data=>{
            res.send("deleted");
        }).catch(err=>{
            next(err);
        })
    }
    
    function getAllConcursos(req,res,next){
        adminService.getAllConcursos().then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function createConcurso(req,res,next){
        adminService.createConcurso(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }
     function editConcurso(req,res,next){
        adminService.editConcurso(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function deleteConcurso(req,res,next){
        adminService.deleteConcurso(req.body.id).then(data=>{
            res.send("deleted");
        }).catch(err=>{
            next(err);
        })
    }

    function getFinalists(req,res,next){
        adminService.getFinalists(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    }

    function setFinalist(req,res,next){
        adminService.setFinalist(req.body,req.user).then(data=>{
            console.log(data);
            res.send({result:data});
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    }

    function downloadFinalistReport(req,res,next){
        adminService.downloadFinalistReport(req,res,next);
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
        processTransaction,
        getAllTransactions,
        getAllSchools,
        createSchool,
        deleteSchool,
        getAllConcursos,
        createConcurso,
        editConcurso,
        deleteConcurso,        
        getFinalists,
        setFinalist,
        downloadFinalistReport
    }
}
