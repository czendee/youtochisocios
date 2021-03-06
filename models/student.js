"use strict";
let Sequelize = require("sequelize");
let bcrypt = require('bcrypt-nodejs');
let SALT_WORK_FACTOR = 12;
module.exports = app => {

    let sequelize = app.db.connection;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;

    let mailService = app.services.mailService

    let Transaction = null;
    let Coupon = null;
    let Concurso = null;
    let User = null;

    let count = 0;

    var Student = sequelize.define("students", {  
        id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        createdat: {
            type: Sequelize.DATE
        },
        updatedat: {
            type: Sequelize.DATE
        },
        status: {
                type: Sequelize.STRING
        },
        essay: {
                type: Sequelize.TEXT
        },
        curp: {
                type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        middlename: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        school:{
            type:Sequelize.STRING
        },
        entity:{
            type:Sequelize.STRING
        },
        grade:{
            type:Sequelize.INTEGER
        },
        comments:{
            type:Sequelize.TEXT
        },
        plagarism:{
            type:Sequelize.STRING
        },
        spellingpoints:{
            type:Sequelize.INTEGER
        },
        title:{
            type:Sequelize.STRING
        },
        evaluation1teacher:{
            type:Sequelize.INTEGER
        },
        evaluation2teacher:{
            type:Sequelize.INTEGER
        },
        contentcriteria1a:{
            type:Sequelize.INTEGER
        },
        contentcriteria2a:{
            type:Sequelize.INTEGER
        },
        contentcriteria3a:{
            type:Sequelize.INTEGER
        },
        contentcriteria4a:{
            type:Sequelize.INTEGER
        },
        contentcriteria5a:{
            type:Sequelize.INTEGER
        },        
        draftingcriteria1a:{
            type:Sequelize.INTEGER
        },
        draftingcriteria2a:{
            type:Sequelize.INTEGER
        },
        draftingcriteria3a:{
            type:Sequelize.INTEGER
        },        
        contentcriteria1b:{
            type:Sequelize.INTEGER
        },
        contentcriteria2b:{
            type:Sequelize.INTEGER
        },
        contentcriteria3b:{
            type:Sequelize.INTEGER
        },
        contentcriteria4b:{
            type:Sequelize.INTEGER
        },
        contentcriteria5b:{
            type:Sequelize.INTEGER
        },        
        draftingcriteria1b:{
            type:Sequelize.INTEGER
        },
        draftingcriteria2b:{
            type:Sequelize.INTEGER
        },
        draftingcriteria3b:{
            type:Sequelize.INTEGER
        },        
        paymentmade:{
            type:Sequelize.BOOLEAN
        },
        paymentstatus:{
            type:Sequelize.STRING
        },
        transactionid:{
            type:Sequelize.INTEGER
        },
        couponcode:{
            type:Sequelize.STRING
        },
     
        fouls: {
            type:Sequelize.INTEGER
        },
        finalist: {
            type:Sequelize.BOOLEAN
        },
        concursocode:{
            type:Sequelize.STRING
        }

    },
    {
        tableName: "sociostudents",
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        instanceMethods: {
            generateHash: function(password){
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },

            validPassword: function(password){
                console.log(bcrypt);
                return bcrypt.compareSync(password, this.password);
            },
            toJSON: function () {
                console.log("tojson");
              var values = Object.assign({}, this.get());
              delete values.password;
              return values;
            }
        }

    });

    Student.beforeCreate(function(user, options) {
        var hashedPw = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
        user.password = hashedPw;
    });

    function getStudent(id){
        return Student.findById(id);
    }
 
    function createNewStudent(params){
        return Student.create({username:params.username, password:params.password});
    }

    function getAllStudents(){
        return Student.findAll({
            include:[{model:User.User,as:'evaluation1TeacherModel',required:false},{model:User.User,as:'evaluation2TeacherModel',required:false}]
        })
    }

    function deleteStudent(id){
        return Student.destroy({
            where:{
                id:id
            }
        })
    }

    function createNewRegistration(data){
        return Student.create({
            email:data.email,
            name:data.name,
            middlename:data.middleName,
            lastname:data.lastName,
            entity:data.entity,
            password:data.password,
            school:data.school,
            curp:data.curp,
            grade:data.grade,
            status:"registered",
            paymentMade:false,
            couponcode:data.coupon,
            concursocode:data.concurso
        })
    }

    function findByEmail(email){
        return Student.findAll(
            {
                where:{email:email}}
            )
    }

    function updateEssay(data,id){
        return Student.update({
            essay:data.essay,
            title:data.title,
            status:"saved"
        },{
            where:{
                id:id
            }
        })
    }

    function updateStudentData(data,id){
        return Student.update({
            name:data.name,
            middlename:data.middleName,
            lastname:data.lastName,
            entity:data.entity,
            school:data.school,
            curp:data.curp,
            grade:data.grade
        },{
            where:{
                id:id
            }
        })
    }

    function getStudentById(id){
        return Student.findById(id);
    }

    function evaluateByModerator(data,moderator){
        return new Promise((resolve,reject)=>{
            Student.findById(data.studentId).then(studentDetails=>{

                if(!studentDetails.evaluation1Teacher || !studentDetails.evaluation2Teacher){
                    User.getAllTeachersByGrade(studentDetails.grade).then(teachers=>{
                        console.log("got all teachers");
                        console.log(count);
                        console.log(teachers.length);
                        console.log("lengths");
                        if(count==teachers.length){
                            count = 0;
                        }

                        var teacher1 = teachers[count];
                        var teacher2 = teachers[count+1];

                        var object = {};
                        var comment = {commentor:moderator, comment:data.moderatorComments};
                        var commentToSave = [];
                        if(data.moderatorComments){
                            if(!studentDetails.comments){
                                commentToSave=[];
                            }
                            else
                            {
                                if(JSON.parse(studentDetails.comments) instanceof Array){
                                    commentToSave = JSON.parse(studentDetails.comments);
                                }
                                else
                                {
                                    commentToSave=[];
                                }
                            }
                            commentToSave.push(comment);
                            object={
                                comments:JSON.stringify(commentToSave),
                                plagarism:data.plagarism,
                                spellingpoints:data.spellingPoints,
                                fouls:data.fouls,
                                status:"approved",
                                evaluation1teacher:teacher1.id,
                                evaluation2teacher:teacher2.id
                            }
                        }
                        else
                        {
                            object={
                                plagarism:data.plagarism,
                                spellingpoints:data.spellingPoints,
                                fouls:data.fouls,
                                status:"approved",
                                evaluation1teacher:teacher1.id,
                                evaluation2teacher:teacher2.id
                            }
                        }
                        Student.update(object,{
                            where:{
                                id:data.studentId
                            },
                            returning: true
                        }).then(studentdata=>{
                            count++;
                            return resolve(studentdata);
                        }).catch(err=>{
                            return reject(err);
                        })
                    });
                }
                else
                {
                    var object = {};
                    var comment = {commentor:moderator, comment:data.moderatorComments};
                    var commentToSave = [];
                    if(data.moderatorComments){
                        if(!studentDetails.comments){
                            commentToSave=[];
                        }
                        else
                        {
                            if(JSON.parse(studentDetails.comments) instanceof Array){
                                commentToSave = JSON.parse(studentDetails.comments);
                            }
                            else
                            {
                                commentToSave=[];
                            }
                        }
                        commentToSave.push(comment);
                        object={
                            comments:JSON.stringify(commentToSave),
                            plagarism:data.plagarism,
                            spellingpoints:data.spellingPoints,
                            fouls:data.fouls,
                            status:"approved"
                        }
                    }
                    else
                    {
                        object={
                            plagarism:data.plagarism,
                            spellingpoints:data.spellingPoints,
                            fouls:data.fouls,
                            status:"approved"
                        }
                    }
                    Student.update(object,{
                        where:{
                            id:data.studentId
                        },
                        returning: true
                    }).then(studentdata=>{
                        return resolve(studentdata);
                    }).catch(err=>{
                        return reject(err);
                    })
                }
            })
        })
    }

    function checkStudentBeforeRegister(data){
        return Student.findAll({
            where:{
                $or:[
                    {email:data.email},
                    {curp:data.curp}
                ]
            }
        })
    }

    function sendEssay(user){
        return Student.update({
            status:"sent"
        },{
            where:{
                id:user.id
            }
        })
    }

 

    function rejectEssay(data,moderator){
        return new Promise((resolve,reject)=>{
            Student.findById(data.studentId).then(studentDetails=>{
                var object = {};
                var comment = {commentor:moderator, comment:data.moderatorComments};
                var commentToSave = [];
                if(data.moderatorComments){
                    if(!studentDetails.comments){
                        commentToSave=[];
                    }
                    else
                    {
                        if(JSON.parse(studentDetails.comments) instanceof Array){
                            commentToSave = JSON.parse(studentDetails.comments);
                        }
                        else
                        {
                            commentToSave=[];
                        }
                    }
                    commentToSave.push(comment);
                    object={
                        comments:JSON.stringify(commentToSave),
                        plagarism:data.plagarism,
                        spellingpoints:data.spellingPoints,
                        fouls:data.fouls,
                        status:"rejected"
                    }
                }
                else
                {
                    object={
                        plagarism:data.plagarism,
                        spellingpoints:data.spellingPoints,
                        fouls:data.fouls,
                        status:"rejected"
                    }
                }

                Student.update(object,{
                    where:{
                        id:data.studentId
                    },
                    returning: true
                }).then(studentdata=>{
                    return resolve(studentDetails);
                }).catch(err=>{
                    return reject(err);
                })
            })
        })
    }

    function getApprovedEssays(user){
        return Student.findAll({
            where:{
                status:["approved","evaluating"],
                grade:user.grade,
                $or:[
                    {evaluation1teacher:user.id, contentcriteria1a:null},
                    {evaluation2teacher:user.id, contentcriteria1b:null}
                ]
            }
        })
    }

    function evaluateEssay(params,user){
        return new Promise((resolve,reject)=>{
            Student.findById(params.studentId).then(student=>{
                var comments = student.comments;
                if(comments){
                    if(JSON.parse(comments) instanceof Array){
                        comments = JSON.parse(comments);
                    }
                }
                else
                {
                    comments=[];
                }

                if(params.moderatorComments){
                    comments.push({commentor:user, comment:params.moderatorComments})
                }
                var status = "evaluating";

                if(student.evaluation1Teacher == user.id){
                    if(student.contentCriteria1B){
                        status = "evaluated";
                    }
                    Student.update({
                        contentcriteria1a:params.contentCriteria1,
                        contentcriteria2a:params.contentCriteria2,
                        contentcriteria3a:params.contentCriteria3,
                        contentcriteria4a:params.contentCriteria4,
                        contentcriteria5a:params.contentCriteria5,
                        draftingcriteria1a:params.draftingCriteria1,
                        draftingcriteria2a:params.draftingCriteria2,
                        draftingcriteria3a:params.draftingCriteria3,
                        comments:JSON.stringify(comments),
                        status:status
                    },{
                        where:{
                            id:params.studentId
                        },
                        returning:true
                    }).then(data=>{
                        if(status == "evaluated"){
                            mailService.sendFinalistMail(student.email, student.name)
                        }
                        return resolve(data);
                    }).catch(err=>{
                        return reject(err);
                    })
                }
                else if(student.evaluation2Teacher == user.id){
                    if(student.contentCriteria1A){
                        status = "evaluated";
                    }
                    Student.update({
                        contentcriteria1b:params.contentCriteria1,
                        contentcriteria2b:params.contentCriteria2,
                        contentcriteria3b:params.contentCriteria3,
                        contentcriteria4b:params.contentCriteria4,
                        contentcriteria5b:params.contentCriteria5,
                        draftingcriteria1b:params.draftingCriteria1,
                        draftingcriteria2b:params.draftingCriteria2,
                        draftingcriteria3b:params.draftingCriteria3,
                        comments:JSON.stringify(comments),
                        status:status
                    },{
                        where:{
                            id:params.studentId
                        },
                        returning: true
                    }).then(studentdata=>{
                        if(status == "evaluated"){
                            mailService.sendFinalistMail(studentdata.email, studentdata.name)
                        }
                        return resolve(studentdata);
                    }).catch(err=>{
                        return reject(err);
                    })
                }
                else
                {
                    return reject("you are not assigned to this essay");
                }
            })
        })
    }

    function updateUserCouponAndReload(coupon,user){
        return Student.update({couponcode:coupon},{
            where:{
                id:user.id
            }
        })
    }

    function checkPaymentStatus(user){
        return Student.findById(user.id);
    }

    function processTransaction(params,transactionId){
        var id = parseInt(params.reference.replace('LeescubreloRegFee',''))
        var paymentMade = false;
        if(params.status=='paid'){
            paymentMade=true;
        }

        return Student.update({
            paymentstatus:params.status,
            paymentmade:paymentMade,
            transactionid:transactionId,
            status:"paid"
        },
        {
            where:{
                id:id
            }
        })
    }

    function initializeModel(){
        Transaction = app.models.transaction.Transaction;
        Coupon = app.models.coupon.Coupon;
        Concurso = app.models.concurso.Concurso;
        User = app.models.user;

        Student.belongsTo(Coupon,{foreignKey:"couponcode",targetKey:"code"});
        Student.belongsTo(Concurso,{foreignKey:"concursocode",targetKey:"code"});
        Student.belongsTo(Transaction,{foreignKey:"transactionid"});
        Student.belongsTo(User.User,{foreignKey:"evaluation1teacher", as:"evaluation1TeacherModel"});
        Student.belongsTo(User.User,{foreignKey:"evaluation2teacher", as:"evaluation2TeacherModel"});

    }

    function markPayed(user){
        return Student.update({
            paymentmade:true,
            status:"paid"
        },{
            where:{
                id:user.id
            }
        })
    }

    function getFinalists(params){
        return Student.findAll({
            attributes:[
                'id','name','middlename','lastname','school','contentcriteria1a','contentcriteria2a','contentcriteria3a','contentcriteria4a','draftingcriteria1a','draftingcriteria2a','contentcriteria1b','contentcriteria2b','contentcriteria3b','contentcriteria4b','draftingcriteria1b','draftingcriteria2b','school','grade','status','finalist','concursocode',
                [
                  
                    sequelize.literal('    (     (  ("draftingcriteria3a" *.25 ) +  ( ("contentcriteria1a"+"contentcriteria2a"+"contentcriteria3a"+"contentcriteria4a"+"contentcriteria5a") * 0.1 ) + ( "draftingcriteria1a" * 0.15   )+ ( "draftingcriteria2a" * 0.1  )     )         +       (      ("draftingCriteria3B" * 0.25 ) +   ( ("contentCriteria1B"+"contentCriteria2B"+"contentCriteria3B"+"contentCriteria4B"+"contentCriteria5B") *.1)   + ( "draftingCriteria1B" *.15 )+ ( "draftingCriteria2B" *.1 )     )          ) / 2 '), 
                    'total'
                ],
                [
                    sequelize.literal('   (  ("draftingcriteria3a" *.25 ) +  ( ("contentcriteria1a"+"contentcriteria2a"+"contentcriteria3a"+"contentcriteria4a"+"contentcriteria5a") * 0.1 ) + ( "draftingcriteria1a" * 0.15   )+ ( "draftingcriteria2a" * 0.1  )     )      '), 
                    'teacher1Total'
                ],
                [
                    sequelize.literal('   (      ("draftingcriteria3b" * 0.25 ) +   ( ("contentcriteria1b"+"contentcriteria2b"+"contentcriteria3b"+"contentcriteria4b"+"contentcriteria5b") *.1)   + ( "draftingcriteria1b" *.15 )+ ( "draftingcriteria2b" *.1 )     )  '), 
                    'teacher2Total'
                ]
            ],
            include:[{model:User.User,as:'evaluation1TeacherModel',required:false},{model:User.User,as:'evaluation2TeacherModel',required:false}],
            where:{
                status:"evaluated",
                contentcriteria1a:{
                    $ne:null
                },
                contentcriteria1b:{
                    $ne:null
                }
            },
            order: [[sequelize.col('total'), 'DESC']]
        })
    }

    function setFinalist(params,moderator){

        return Student.findOne({
            where:{
                id:params.studentId
            }
        }).then(studentData=>{
            if(studentData){
                
                var commentToSave = [];

                if(!studentData.comments){
                    commentToSave=[];
                }
                else
                {
                    if(JSON.parse(studentData.comments) instanceof Array){
                        commentToSave = JSON.parse(studentData.comments);
                    }
                    else
                    {
                        commentToSave=[];
                    }
                }

                if(params.comment){
                    var comment = {commentor:moderator, comment:params.comment};
                    commentToSave.push(comment)
                }

                return studentData.update({
                    comments:JSON.stringify(commentToSave),
                    finalist:params.finalist
                })

            }
            else
            {
                return new Promise((resolve,reject)=>{
                    return reject("student does not exist");
                })
            }
        });
    }

    function getFinalistsForDownload(params){
        return new Promise((resolve,reject)=>{
            Student.findAll({
                attributes:[
                    'id','name','curp','email','entity','title','plagarism','spellingpoints','couponcode','fouls','middlename','lastname','school','contentcriteria1a','contentcriteria2a','contentCriteria3A','contentCriteria4A','draftingCriteria1A','draftingCriteria2A','contentCriteria1B','contentCriteria2B','contentCriteria3B','contentCriteria4B','draftingCriteria1B','draftingCriteria2B','school','grade','status','finalist',
                    [
                        sequelize.literal("(`contentCriteria1A`+`contentCriteria2A`+`contentCriteria3A`+`contentCriteria4A`+`contentCriteria5A`+`draftingCriteria1A`+`draftingCriteria2A` +`draftingCriteria3A`+`contentCriteria1B`+`contentCriteria2B`+`contentCriteria3B`+`contentCriteria4B`+`contentCriteria5B`+`draftingCriteria1B`+`draftingCriteria2B` +`draftingCriteria3B`)"), 
                        'total'
                    ],
                    [
                        sequelize.literal("(`contentCriteria1A`+`contentCriteria2A`+`contentCriteria3A`+`contentCriteria4A`+`contentCriteria5A`+`draftingCriteria1A`+`draftingCriteria2A`+`draftingCriteria3A`)"), 
                        'teacher1Total'
                    ],
                    [
                        sequelize.literal("(`contentCriteria1B`+`contentCriteria2B`+`contentCriteria3B`+`contentCriteria4B`+`contentCriteria5B`+`draftingCriteria1B`+`draftingCriteria2B`+`draftingCriteria3B`)"), 
                        'teacher2Total'
                    ]
                ],
                include:[{model:User.User,as:'evaluation1TeacherModel',required:false},{model:User.User,as:'evaluation2TeacherModel',required:false}],
                where:{
                    status:"evaluated",
                    contentCriteria1A:{
                        $ne:null
                    },
                    contentCriteria1B:{
                        $ne:null
                    }
                },
                order: [[sequelize.col('total'), 'DESC']]
            }).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    return {
        Student,
        initializeModel,
        getStudent,
        createNewStudent,
        getAllStudents,
        deleteStudent,
        createNewRegistration,
        findByEmail,
        updateEssay,
        updateStudentData,
        getStudentById,
        evaluateByModerator,
        checkStudentBeforeRegister,
        sendEssay,
        rejectEssay,
        getApprovedEssays,
        evaluateEssay,
        updateUserCouponAndReload,
        checkPaymentStatus,
        processTransaction,
        markPayed,
        getFinalists,
        setFinalist,
        getFinalistsForDownload
    };
};
