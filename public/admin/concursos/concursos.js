"use strict";
(function(){

function concursosController($scope, Concurso, notify) {
  console.log("working in concurso");
  var self = this;
  self.concursos = [];
  self.deleteConcurso = deleteConcurso;
  self.editConcurso = editConcurso;
  self.addConcurso = addConcurso;
  self.saveEditConcurso = saveEditConcurso;

  function deleteConcurso(concurso, index){
    Concurso.destroy(concurso.id).then(function(data){
      self.concursos.splice(index,1);
      notify('Concurso eliminado exitosamente');
    }).catch(function(err){
      notify('Please try again later');
    })
  }

  function addConcurso(){
    Concurso.create(self.newconcurso).then(function(data){
      self.concursos.push(data.data);
      notify('Concurso añadido exitosamente');
      UIkit.modal("#addConcurso").hide();
      self.concursos.push(data.data);
    }).catch(function(err){
      notify('Please try again later');
    })
  }
  
  function saveEditConcurso(){
    console.log(self.editconcurso);
    Concurso.update(self.editconcurso).then(function(data){
      console.log(data);
      UIkit.modal("#editConcurso").hide();
      notify('Concurso editado exitosamente');
    })
  }

  function editConcurso(concurso){
    self.editconcurso = concurso
    
  }

  Concurso.getAll().then(function(data){
    self.concursos = data.data;
  })

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('concursos', {
        url: '/concursos',
        templateUrl: '/admin/concursos/concursos.html',
        controller: concursosController,
        controllerAs : "concursosController"
      });
  });

})();
