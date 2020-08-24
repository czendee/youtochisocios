'use strict';

angular.module('admin')
  .service('Concurso', function ($http) {

    var service = {

      getAll: function(){
          return $http({
//            url: '/admin/concursos/all',            
            url:'https://peaceful-retreat-91246.herokuapp.com/banwireapi/cotizaciones101',
            method:'GET',
            data:{}
          });
      },
      create: function(data){
        return $http({
//          url:"/admin/concurso/create",
            url:'https://peaceful-retreat-91246.herokuapp.com/banwireapi/cotizaciones101',          
          method:'POST',
          data:data
        })
      },
      update: function(data){
        return $http({
//          url:"/admin/concurso/edit",
            url:'https://peaceful-retreat-91246.herokuapp.com/banwireapi/cotizacionesedit101',          
          method:'POST',
          data:data
        })
      },      
      destroy: function(concursoId){
        return $http({
//          url:"/admin/concurso/delete",
            url:'https://peaceful-retreat-91246.herokuapp.com/banwireapi/cotizaciones101',                    
          method:'DELETE',
          data:{
            id:concursoId
          }
        })
      }
    }

    return service;

  });
