"use strict";
(function(){

function finalistsController($scope, School, notify, Student) {
  var self = this;
  self.finalists=[];
  self.loaded = false;

  function getFinalists(){
    self.loaded = false;
    Student.getFinalists().then(function(data){
      console.log(data);
      self.finalists = data.data;
      self.loaded = true;
    })
  }


  getFinalists();

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('finalists', {
        url: '/finalists',
        templateUrl: '/admin/finalists/finalists.html',
        controller: finalistsController,
        controllerAs : "finalistsController"
      });
  });

})();