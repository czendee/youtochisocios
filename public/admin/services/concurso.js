'use strict';

angular.module('admin')
  .service('Concurso', function ($http) {

    var service = {

      getAll: function(){
          return $http({
            url: '/admin/concursos/all',
            method:'GET',
            data:{}
          });
      },
      create: function(data){
        return $http({
          url:"/admin/concurso/create",
          method:'POST',
          data:data
        })
      },
      update: function(data){
        return $http({
          url:"/admin/concurso/edit",
          method:'POST',
          data:data
        })
      },      
      destroy: function(concursoId){
        return $http({
          url:"/admin/concurso/delete",
          method:'POST',
          data:{
            id:concursoId
          }
        })
      }
    }

    return service;

  });
