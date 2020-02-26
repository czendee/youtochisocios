"use strict";
(function(){

function teachersController($scope, Student, $stateParams, $window, AdminService, notify) {
  console.log("working in users");
  var self = this;
  self.teachers = [];

  self.getMarkedCount = getMarkedCount;

  function getMarkedCount(teacher){
    if(teacher.marked){
      return JSON.parse(teacher.marked).length;
    }
    else
    {
      return 0;
    }
  }

  AdminService.getAllTeachers().then(function(data){
    self.teachers = data.data;
    console.log(self.teachers);
  })

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teachers', {
        url: '/teachers',
        templateUrl: '/admin/teachers/teachers.html',
        controller: teachersController,
        controllerAs : "teachersController"
      });
  });

})();