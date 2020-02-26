"use strict";

let router = require("express").Router();



module.exports = app => {

    let studentController=app.controllers.studentController;
    let appAdminURL = process.env.APP_URL;
    

    router.route("/pending").get((req,res,next)=>{
        studentController.checkPaymentStatus(req,res,next);
    })
    
    router.route("/").get((req,res,next)=>{

        let amount = 150;
        let coupon = null;

        if(!req.user){
            res.redirect("/");
        }
        else if(req.user.paymentMade){
            res.redirect("/essay");
        }
        else
        {
            //Tochi- Jan 22, 2020 this is called after user clicks the Continuar button to proceed to pay
            console.log("TOCHI route  /   newpay step1 get the token  step 1");  
            if(req.query.pagobanwireir=="cobrar"){
                console.log("TOCHI route  /   newpay step1 get the token  step 2");  
                
                
               //start:http auth basic  to get token for secure window

                 var username = "akyDgbkBcV6AJCBJLo3";  //prod?test?
                 var password = "astYLpzPwYyKZtuAZkN";
                 var auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");
                //end: http auth basic

                //start: body in json
     
                var varbody = {            
                        "reference": req.query.referenciacobro,
                        "concept": "Cuota de inscripción de Leescubrelo new BWPay" ,
                        "total": parseFloat(req.query.amount),
                        "items": {
                        "name": "Cuota inscripcion leescubrelo",
                        "quantity": 1,
                        "description": "Couta",
                        "unit_price": parseFloat(req.query.amount)
                        },
                        "customer": {
                        "id": req.query.referenciacobro,
                        "first_name": req.query.estudiantenombre,
                        "last_name": req.query.estudianteapellidop,
                        "email": req.query.email,
                            "phone": "52015515799155",
                            "address_line1": "Paseo de la reforma #300",
                            "address_zip": "06600",
                            "address_state": "CX",
                            "address_country": "MEX",
                            "address_city": "Ciudad de México"                            
                        }
                        ,"trun_secure_3d": false
                   
                        } ;

                console.log("New BWPay 01:v3- lo que se recibio y puesto en json");
                console.log(JSON.stringify(varbody));
                console.log("New BWPay 01:end");

                //end:   body in json
                request.post({
                    "headers": { "content-type": "application/json",
                                 "authorization": auth
                               },                                       
                    //test            v
                    // prod   visibility
                    
                    "url": "https://docs.banwire.com/session/init",            
                    "body":JSON.stringify(varbody)
                }, (error, response, body) => {
                    console.log("New BWPay 02");            
                    if(error) {
                        console.log("New BWPay 02: error");
                                    //logic to handle the diff responses from banwire
                                    // 200, 400, 401
                        return console.dir(error);
                    }
                    console.log("New BWPay 02: status Ok");
                    console.log(JSON.parse(body));

                    var bwpayresponse  = JSON.parse(body);

                     //error - body response cuando no se pasan los valores/invalid
                      if( ("id" in bwpayresponse)==false){
                            //{
                            //"type": "unauthorized",
                            //"message": "The id is required",
                            //"param_type": "is_required",
                            //"param": "id"
                            //}
                            //{ type: 'invalid_request',
                            //message: 'The reference is required, must be set and not be empty.',
                            //param_type: 'is_required',
                            //param: 'reference' }
                            console.log(" New BWPay 02: status error "+bwpayresponse.type + "    "+bwpayresponse.message);       
                          
                            req.flash("message","Request to BWPAY erronea: "+bwpayresponse.type + "    "+bwpayresponse.message);                           
                            req.flash("executesecurewindow","NO"); 
                            req.flash("tokenexecutesecurewindow","NO"); 
                          
                            res.render("checkout",{user:req.user,message:req.flash("message"),coupon:coupon, amount:amount, executesecurewindow:req.flash("executesecurewindow")   , tokenexecutesecurewindow: req.flash("tokenexecutesecurewindow") ,miurl:appAdminURL});                

                    }else{
                        //then the service responded 
                    //logic to handle the diff responses from banwire
                    //bwpayresponse.response_code.id
                                /*
                                {
                                    "id": "bel6qffcv68g5jjr8oug",
                                    "reference": "MY_REFERENCE_ABC",
                                    "concept": "concepto_de_prueba",
                                    "total": 1,
                                     etc...
                                */


                                console.log("New BWPay 02: id"+bwpayresponse.id);
                                console.log("New BWPay 02: reference"+bwpayresponse.reference);
                                console.log("New BWPay 02: concept"+bwpayresponse.concept);
                                console.log("New BWPay 02: amount"+bwpayresponse.total);

                                
                            //2.after the response is obtained 
                                req.flash("message","Autheticated OK "); 
                                req.flash("executesecurewindow","SI"); 
                                req.flash("tokenexecutesecurewindow",bwpayresponse.id); 
                        
                                res.render("checkout",{user:req.user,message:req.flash("message"),coupon:coupon, amount:amount, executesecurewindow:req.flash("executesecurewindow")   , tokenexecutesecurewindow: req.flash("tokenexecutesecurewindow") ,miurl:appAdminURL });                

                    }//end else 

                });

               console.log("Carlos Z after the ajax call for the new BWPay");   

               //end:http auth basic  to get token for secure window
                
                
            }
            console.log("TOCHI route  /   newpay step1 get the token  step 3");  
            
            
            
            if(req.query.err){
                req.flash("message","Error en el pago, por favor intente de nuevo");
            }
            //TOCHI new route for secure window            
            if(req.query.cancelated){
                req.flash("message","Se cerro el Secure Window, sin aplicar ningun pago");
            }            

            if(req.user.grade==1){
                amount=150;
            }
            if(req.user.grade==2){
                amount=150;
            }
            if(req.user.grade==3){
                amount=150;
            }
            if(req.user.couponCode){
                studentController.getCouponDetailsByCode(req.user.couponCode).then(coupons=>{
                    if(coupons.length>0){
                        coupon=coupons[0];
                        amount = amount - (amount*coupon.percent/100);
                                 //tochi using count to see the avialable coupons 
                                     //tochi  if(coupon.count  > 0){
                                         //tochi  amount = amount - (amount*coupon.percent/100);
                                        //tochi  decrease the number of cupons available 
                                        //tochi coupon.count = coupon.count -1;
                                        //tochi  set the valu in the status field 
                                        //tochi  couponsController.editCoupon(coupon);
                                   //tochi  }else{
                                   //tochi        req.flash("message","Este código de cupón ya fue utilizados")                            
                                   //tochi   }  
 
                    }
                    else
                    {
                        req.flash("message","Este código de cupón no existe")
                    }
                    res.render("checkout",{user:req.user,message:req.flash("message"),coupon:coupon, amount:amount,miurl:appAdminURL});
                })
            }
            else
            {
                console.log("here in checkout 3");
                res.render("checkout",{user:req.user,message:req.flash("message"),coupon:coupon, amount:amount,miurl:appAdminURL});
            }
            
        }
        //studentController.checkAndRegisterStudent(req,res,next);
    })

    
    return router;
};










