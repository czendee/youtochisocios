"use strict";
(function(){

function evaluateController($scope, Student, $stateParams, $window, AdminService, notify) {
  console.log("working in evaluate");
  var self = this;
  self.goBack = goBack;
  self.evaluation = {plagarism:"no"};
  self.submitEvaluation = submitEvaluation;
  self.getWordsLength = getWordsLength;
  var id = $stateParams.studentId;
  self.rejectEvaluation = rejectEvaluation;
  Student.getStudent(id).then(function(data){
    self.student = data.data;
    self.evaluation.studentId = self.student.id;
    console.log(data);
    self.evaluation.spellingPoints = self.student.spellingPoints;
    self.evaluation.fouls = self.student.fouls;
    if(self.student.comments){
      self.comments = JSON.parse(self.student.comments);
    }
    else{
      self.comments = [];
    }
  })

  function goBack(){
    $window.history.back();
  }

  function submitEvaluation(e){
    Student.moderatorEvaluate(self.evaluation).then(function(data){
      notify('Evaluated Successfully');
      goBack();
    })
  }

  function getWordsLength(words){
    if(words){
      return words.match(/\S+/g).length;
    }
    else
    {
      return 0;
    }   
  }

  function rejectEvaluation(){
    Student.moderatorReject(self.evaluation).then(function(data){
      notify('Rejected Successfully');
      goBack();
    })
  }

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('evaluate', {
        url: '/evaluate/:studentId',
        templateUrl: '/admin/evaluate/evaluate.html',
        controller: evaluateController,
        controllerAs : "evaluateController"
      });
  });

})();