"use strict";
(function(){

function finalEvaluateController($scope, Student, $stateParams, $window, AdminService, notify) {
  console.log("working in evaluate");
  var self = this;
  self.goBack = goBack;
  self.evaluation = {plagarism:"no"};
  self.getWordsLength = getWordsLength;
  var id = $stateParams.studentId;
  self.moderatorComments = "";

  self.markFinalist = markFinalist;
  self.rejectEvaluation = rejectEvaluation;

  function markFinalist(){
    var data = {
      studentId:self.studentId,
      comment:self.moderatorComments,
      finalist:true
    }
    Student.finalEvaluate(data).then(function(data){
      notify('Evaluated Successfully');
      goBack();
    });
  }

  function rejectEvaluation(){
    var data = {
      studentId:self.studentId,
      comment:self.moderatorComments,
      finalist:false
    }
    Student.finalEvaluate(data).then(function(data){
      notify('Evaluated Successfully');
      goBack();
    });
  }

  Student.getStudent(id).then(function(data){
    self.student = data.data;
    self.studentId = self.student.id;
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

  

  function getWordsLength(words){
    if(words){
      return words.match(/\S+/g).length;
    }
    else
    {
      return 0;
    }   
  }

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('finalEvaluate', {
        url: '/finalEvaluate/:studentId',
        templateUrl: '/admin/finalEvaluate/finalEvaluate.html',
        controller: finalEvaluateController,
        controllerAs : "finalEvaluateController"
      });
  });

})();