"use strict";

module.exports = app => {
    let loginController = app.controllers.loginController;
    let adminService = app.services.adminService;


    app.use("/login", app.routes.login);
    app.use("/student", app.routes.student);
    app.use("/essay", app.routes.essay);
    app.use("/checkout", app.routes.checkout);


    app.use("/admin", app.routes.admin);



    
    app.get("/", (req, res, next) => {
        console.log("tochi 002: initial \ page   1 initial");
        if(req.user){
            console.log("tochi 002: essay \ page   2.2");
            res.redirect("/essay");
           
        }
        else
        {
            console.log("tochi 102: initial \ page   1.3");
            let dataSchools = null;
            let dataConcursos = null;
            
            adminService.getAllSchools().then(data=>{
                console.log("tochi 102: initial \ page   1.3.1");
                dataSchools =data;
                console.log("tochi 202: initial \ page   1.3");
                adminService.getAllConcursos().then(data=>{
                    console.log("tochi 202: initial \ page   1.3.1");
                    dataConcursos =data;
                     res.render("register",{message:req.flash("message"),schools:dataSchools,concursos:dataConcursos});
                    console.log("tochi 202: initial \ page   1.3.2");
                }).catch(err=>{
                    console.log("tochi 202: initial \ page   1.3.3");
                    console.log(err);
                    console.log("tochi 102: initial \ page   1.3.4");
                    next(err);
                    console.log("tochi 202: initial \ page   1.3.5");
                })                  
                console.log("tochi 102: initial \ page   1.3.2");
            }).catch(err=>{
                console.log("tochi 102: initial \ page   1.3.3");
                console.log(err);
                console.log("tochi 102: initial \ page   1.3.4");
                next(err);
                console.log("tochi 102: initial \ page   1.3.5");
            })
            
          
           
            
        }
        console.log("tochi 002: initial \ page   2");        
    });



    app.get("/logout",(req,res,next)=>{
        req.logout();
        res.redirect('/');
    })
};
