"use strict";
(function(){

function dashboardController($scope, Student, AdminService,$state) {
  
  
  console.log("working in alerts");
  console.log(sessionStorage.getItem("req"));
  sessionStorage.getItem("user")

  if(AdminService.role!='admin'){
  //  $state.go("teacherEvaluation");
  }


  var self = this;

  self.students=[];
  self.totalStudents = [];
  self.concursos = [];//to bring the list of concursos
  
  self.studentType={
    sent:[],
    approved:[],
    evaluating:[],
    evaluated:[],
    rejected:[],
    paid:[]
  }
  self.evaluateStudent = evaluateStudent
  self.setFilter = setFilter;

  function setFilter(type){
    if(type == "all"){
      self.students = self.totalStudents;
    }
    else
    {
      self.students=self.studentType[type];
    }
    
  }

  function evaluateStudent(student){
    $stateProvider
      .state('dashboard.evaluateStudent', {
        url: "/evaluate",
        templateUrl: 'tpl.html',
        params: { hiddenOne: null, }
      })
  }

  Student.getStudents().then(function(data){
      console.log(data);
      self.students = data.data;
      self.totalStudents = data.data;

      self.students.forEach(function(student){
        if(student.status=="sent"){
          self.studentType.sent.push(student);
        }
        if(student.status=="approved"){
          self.studentType.approved.push(student);
        }
        if(student.status=="evaluating"){
          self.studentType.evaluating.push(student);
        }
        if(student.status=="evaluated"){
          self.studentType.evaluated.push(student);
        }
        if(student.status=="rejected"){
          self.studentType.rejected.push(student);
        }
        if(student.status=="paid"){
          self.studentType.paid.push(student);
        }

      })
  })
  
  Student.getAllConcursos().then(function(concursos){  //to bring the list of concursos
    console.log("TOCHI students getAllConcursos  step 1");
    console.log(concursos);
    self.concursos = concursos.data;
    console.log("TOCHI studends getAllConcursos  step 2");
  })
  
}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: '/admin/dashboard/dashboard.html',
        controller: dashboardController,
        controllerAs : "dashboardController"
      });
  });

})();
