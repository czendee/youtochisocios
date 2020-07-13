"use strict"

let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;
let sequelize = require('sequelize');

//let appAdminEmail = process.env.APP_ADMIN_EMAIL;
//let appAdminPass = process.env.APP_ADMIN_PASS;
let appAdminEmail = "admin@admin.com";
let appAdminPass = "12345";

module.exports = app => {

    let Student = app.models.student.Student;
    let User = app.models.user.User;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(student, done) {
            console.log("working in serilize");
            done(null, student);
        });

    passport.deserializeUser(function(student, done) {
        if(student.curp){
            Student.findOne({
                where:{
                    id:student.id
                }
            }).then(student=>{
                done(null, student)
            })
        }
        else
        {
            User.findOne({
                where:{
                    id:student.id
                }
            }).then(user=>{
                done(null, user);
            })
        }
        
    });


    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

      process.nextTick(function() {

                Student.find({ where: {email: email} }).then(function(student) {

                    if (student) {
                        var test = student.validPassword(password);
                        if(test){
                            student.password = undefined;
                            return done(null, student);
                        }
                        return done(null, false, req.flash("message","contraseña incorrecta"));
                    }
                    else {
                         return done(null, false, req.flash("message","usuario no encontrado"));
                    } 
                }).catch(err=>{
                    return done(null, false, req.flash("message","usuario no encontrado"));
                })
          })
        }
    ));

    passport.use('admin-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
             
          
          
          console.log("tochi 001:passport admin login  entre ");
                User.find({ where: {email: email} }).then(function(user) {
                   
                    console.log("tochi 001:passport admin login , si encontro el email :) ");
                    if (user) {
                         console.log("tochi 001:passport admin login, antes validar passw  ");
                        
                        console.log("tochi 002:passport admin login, usuario .yml:"+appAdminEmail);
                        console.log("tochi 002:passport admin login, pass .yml:"+appAdminPass);
                        if( user.email ==appAdminEmail ){
                            console.log("tochi 002:passport admin login, usuario existe  OK");
                            if( password ==appAdminPass ){
                              console.log("tochi 002:passport admin login, pass igual pass .yml  OK ");
                                user.password = undefined;
                                return done(null, user);
                            }else{
                               console.log("tochi 002:passport admin login, pass NO igual pass .yml  NOK ");
                               return done(null, false);
                            }                            
                        }else{
                            console.log("tochi 002:passport admin login, usuario NO es admin admin OK, validar encryptacion");
                            var test = user.validPassword(password);


                            console.log("tochi 001:passport admin login, passw despues verificar, antes if ");
                            if(test){
                                user.password = undefined;
                                return done(null, user);
                            }

                            console.log("tochi 001:passport admin login, error passw mal ");
                            return done(null, false);                            
                        }
                        
                        //tochi : previous
/*                        
                        var test = user.validPassword(password);
                        console.log("tochi 001:passport admin login, passw despues verificar, antes if ");
                        if(test){
                            user.password = undefined;
                            return done(null, user);
                        }                       
                        console.log("tochi 001:passport admin login, error passw mal ");
                        return done(null, false);
                        //Tochi temporal, to makeit work without validate password   
                        //return done(null, user);
*/                        
                    }
                    else
                    {
                       
                        console.log("tochi 001:passport admin login, error no user ");
                        return done(null, false);
                    }
                }).catch(err=>{
                    console.log("tochi 001:passport admin login, error real ");
                    return done(null, false);
                })
          })
        }
    ));

    return passport;

}
