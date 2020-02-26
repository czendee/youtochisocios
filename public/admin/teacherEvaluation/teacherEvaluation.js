"use strict";
(function(){

function teacherEvaluationController($scope, Student, $stateParams, $window, AdminService, notify) {

    console.log("working in teachers evaluation");
    var self = this;
    self.students = [];
    self.getNoOfEvaluations = getNoOfEvaluations;


    AdminService.getApprovedEssays().then(function(students){
        console.log(students);
        self.students = students.data;
    })


    function getNoOfEvaluations(student){
        var evaluations = 0;
        if(student.evaluation1Teacher){
            evaluations = 1;
        }

        return evaluations;
    }


}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teacherEvaluation', {
        url: '/teacherEvaluation',
        templateUrl: '/admin/teacherEvaluation/teacherEvaluation.html',
        controller: teacherEvaluationController,
        controllerAs : "teacherEvaluationController"
      });
  });

})();