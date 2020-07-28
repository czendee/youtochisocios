"use strict";
(function(){

function robotsController($scope, School, notify) {
  console.log("working in robots");
  var self = this;
  self.schools = [];
  self.deleteSchool = deleteSchool;
  self.addSchool = addSchool;

  function deleteSchool(school, index){
    School.destroy(school.id).then(function(data){
      self.schools.splice(index,1);
      notify('Escuela eliminada exitosamente');
    }).catch(function(err){
      notify('Please try again later');
    })
  }

  function addSchool(){
    School.create(self.newschool).then(function(data){
      self.schools.push(data.data);
      notify('Escuela añadida exitosamente');
      UIkit.modal("#addSchool").hide();
    }).catch(function(err){
      notify('Please try again later');
    })
  }

  School.getAll().then(function(data){
    self.schools = data.data;
  })

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schools', {
        url: '/robots',
        templateUrl: '/admin/robots/robots.html',
        controller: robotsController,
        controllerAs : "robotssController"
      });
  });

})();
