"use strict";
(function(){

function evaluateStudentByTeacherPageController($scope, Student, $stateParams, $window, AdminService, notify) {
  console.log("working in evaluateStudentByTeacherPage");
  var self = this;

  var id = $stateParams.studentId;
  self.evaluation = {};
  self.getWordsLength = getWordsLength;
  self.getTotalWords = getTotalWords
  self.submitEvaluation = submitEvaluation;
  self.goBack=goBack;

  Student.getStudent(id).then(function(data){
    console.log(data);
    self.student = data.data;
    self.evaluation.studentId = self.student.id;
    console.log(data);

    if(self.student.comments){
      console.log("asdfhjksdf");
      console.log(JSON.parse(self.student.comments));
      self.comments = JSON.parse(self.student.comments);
    }
    else{
      self.comments = [];
    }
    
  })

  function getWordsLength(words){
    if(words){
      return words.match(/\S+/g).length;
    }
    else
    {
      return 0;
    }  
  }

  function getNoOfEvaluations(student){
      console.log("here");
      var evaluations = 0;
      if(student.evaluation1Teacher){
          evaluations = 1;
      }
      return evaluations;
  }

  function getTotalWords(){
    console.log("jkasdhfhjasdf");
    if(self.student){
      if(self.student.grade==1){
        return 720
      }
      else if(self.student.grade==2){
        return 960
      }
      else if(self.student.grade==3){
        return 1200
      }
      else{
        return 600
      }
    }
  }

  function goBack(){
    $window.history.back();
  }

  function submitEvaluation(){

    console.log(self.evaluation);

    Student.evaluateStudentEssay(self.evaluation).then(function(data){
      notify('Evaluated Successfully');
      goBack();
    })


  }

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('evaluateStudentByTeacherPage', {
        url: '/evaluateStudentByTeacherPage/:studentId',
        templateUrl: '/admin/evaluateStudentByTeacherPage/evaluateStudentByTeacherPage.html',
        controller: evaluateStudentByTeacherPageController,
        controllerAs : "evaluateStudentByTeacherPageController"
      });
  });

})();
