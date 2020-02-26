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
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
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
        spellingPoints:{
            type:Sequelize.INTEGER
        },
        title:{
            type:Sequelize.STRING
        },
        evaluation1Teacher:{
            type:Sequelize.INTEGER
        },
        evaluation2Teacher:{
            type:Sequelize.INTEGER
        },
        contentCriteria1A:{
            type:Sequelize.INTEGER
        },
        contentCriteria2A:{
            type:Sequelize.INTEGER
        },
        contentCriteria3A:{
            type:Sequelize.INTEGER
        },
        contentCriteria4A:{
            type:Sequelize.INTEGER
        },
        contentCriteria5A:{
            type:Sequelize.INTEGER
        },        
        draftingCriteria1A:{
            type:Sequelize.INTEGER
        },
        draftingCriteria2A:{
            type:Sequelize.INTEGER
        },
        draftingCriteria3A:{
            type:Sequelize.INTEGER
        },        
        contentCriteria1B:{
            type:Sequelize.INTEGER
        },
        contentCriteria2B:{
            type:Sequelize.INTEGER
        },
        contentCriteria3B:{
            type:Sequelize.INTEGER
        },
        contentCriteria4B:{
            type:Sequelize.INTEGER
        },
        contentCriteria5B:{
            type:Sequelize.INTEGER
        },        
        draftingCriteria1B:{
            type:Sequelize.INTEGER
        },
        draftingCriteria2B:{
            type:Sequelize.INTEGER
        },
        draftingCriteria3B:{
            type:Sequelize.INTEGER
        },        
        paymentMade:{
            type:Sequelize.BOOLEAN
        },
        paymentStatus:{
            type:Sequelize.STRING
        },
        transactionId:{
            type:Sequelize.INTEGER
        },
        couponCode:{
            type:Sequelize.STRING
        },
     
        fouls: {
            type:Sequelize.INTEGER
        },
        finalist: {
            type:Sequelize.BOOLEAN
        },
        concursoCode:{
            type:Sequelize.STRING
        }

    },
    {
        tableName: "students",
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
            couponCode:data.coupon,
            concursoCode:data.concurso
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
                                spellingPoints:data.spellingPoints,
                                fouls:data.fouls,
                                status:"approved",
                                evaluation1Teacher:teacher1.id,
                                evaluation2Teacher:teacher2.id
                            }
                        }
                        else
                        {
                            object={
                                plagarism:data.plagarism,
                                spellingPoints:data.spellingPoints,
                                fouls:data.fouls,
                                status:"approved",
                                evaluation1Teacher:teacher1.id,
                                evaluation2Teacher:teacher2.id
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
                            spellingPoints:data.spellingPoints,
                            fouls:data.fouls,
                            status:"approved"
                        }
                    }
                    else
                    {
                        object={
                            plagarism:data.plagarism,
                            spellingPoints:data.spellingPoints,
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
                        spellingPoints:data.spellingPoints,
                        fouls:data.fouls,
                        status:"rejected"
                    }
                }
                else
                {
                    object={
                        plagarism:data.plagarism,
                        spellingPoints:data.spellingPoints,
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
                    {evaluation1Teacher:user.id, contentCriteria1A:null},
                    {evaluation2Teacher:user.id, contentCriteria1B:null}
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
                        contentCriteria1A:params.contentCriteria1,
                        contentCriteria2A:params.contentCriteria2,
                        contentCriteria3A:params.contentCriteria3,
                        contentCriteria4A:params.contentCriteria4,
                        contentCriteria5A:params.contentCriteria5,
                        draftingCriteria1A:params.draftingCriteria1,
                        draftingCriteria2A:params.draftingCriteria2,
                        draftingCriteria3A:params.draftingCriteria3,
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
                        contentCriteria1B:params.contentCriteria1,
                        contentCriteria2B:params.contentCriteria2,
                        contentCriteria3B:params.contentCriteria3,
                        contentCriteria4B:params.contentCriteria4,
                        contentCriteria5B:params.contentCriteria5,
                        draftingCriteria1B:params.draftingCriteria1,
                        draftingCriteria2B:params.draftingCriteria2,
                        draftingCriteria3B:params.draftingCriteria3,
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
        return Student.update({couponCode:coupon},{
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
            paymentStatus:params.status,
            paymentMade:paymentMade,
            transactionId:transactionId,
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

        Student.belongsTo(Coupon,{foreignKey:"couponCode",targetKey:"code"});
        Student.belongsTo(Concurso,{foreignKey:"concursoCode",targetKey:"code"});
        Student.belongsTo(Transaction,{foreignKey:"transactionId"});
        Student.belongsTo(User.User,{foreignKey:"evaluation1Teacher", as:"evaluation1TeacherModel"});
        Student.belongsTo(User.User,{foreignKey:"evaluation2Teacher", as:"evaluation2TeacherModel"});

    }

    function markPayed(user){
        return Student.update({
            paymentMade:true,
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
                'id','name','middlename','lastname','school','contentCriteria1A','contentCriteria2A','contentCriteria3A','contentCriteria4A','draftingCriteria1A','draftingCriteria2A','contentCriteria1B','contentCriteria2B','contentCriteria3B','contentCriteria4B','draftingCriteria1B','draftingCriteria2B','school','grade','status','finalist','concursoCode',
                [
                  
                    sequelize.literal('    (     (  ("draftingCriteria3A" *.25 ) +  ( ("contentCriteria1A"+"contentCriteria2A"+"contentCriteria3A"+"contentCriteria4A"+"contentCriteria5A") * 0.1 ) + ( "draftingCriteria1A" * 0.15   )+ ( "draftingCriteria2A" * 0.1  )     )         +       (      ("draftingCriteria3B" * 0.25 ) +   ( ("contentCriteria1B"+"contentCriteria2B"+"contentCriteria3B"+"contentCriteria4B"+"contentCriteria5B") *.1)   + ( "draftingCriteria1B" *.15 )+ ( "draftingCriteria2B" *.1 )     )          ) / 2 '), 
                    'total'
                ],
                [
                    sequelize.literal('   (  ("draftingCriteria3A" *.25 ) +  ( ("contentCriteria1A"+"contentCriteria2A"+"contentCriteria3A"+"contentCriteria4A"+"contentCriteria5A") * 0.1 ) + ( "draftingCriteria1A" * 0.15   )+ ( "draftingCriteria2A" * 0.1  )     )      '), 
                    'teacher1Total'
                ],
                [
                    sequelize.literal('   (      ("draftingCriteria3B" * 0.25 ) +   ( ("contentCriteria1B"+"contentCriteria2B"+"contentCriteria3B"+"contentCriteria4B"+"contentCriteria5B") *.1)   + ( "draftingCriteria1B" *.15 )+ ( "draftingCriteria2B" *.1 )     )  '), 
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
                    'id','name','curp','email','entity','title','plagarism','spellingPoints','couponCode','fouls','middlename','lastname','school','contentCriteria1A','contentCriteria2A','contentCriteria3A','contentCriteria4A','draftingCriteria1A','draftingCriteria2A','contentCriteria1B','contentCriteria2B','contentCriteria3B','contentCriteria4B','draftingCriteria1B','draftingCriteria2B','school','grade','status','finalist',
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
