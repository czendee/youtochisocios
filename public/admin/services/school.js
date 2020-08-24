'use strict';

angular.module('admin')
  .service('School', function ($http) {

    var service = {

      getAll: function(){
          console.log('despliega paso 1');
          return $http({
////            url: '/admin/schools/all',
            url:'https://peaceful-retreat-91246.herokuapp.com/api/robots101',
            method:'GET',
            data:{}
          });
      },
      create: function(data){
        console.log('despliega paso 2');
        return $http({
//          url:"/admin/school/create",
            url:'https://peaceful-retreat-91246.herokuapp.com/api/robots101',          
          method:'POST',
          data:data
        })
      },
      destroy: function(schoolId){
        return $http({
//          url:"/admin/school/delete",
          url:'http://peaceful-retreat-91246.herokuapp.com/api/robots',  
//          /api/robots/:id
          method:'DELETE',
          data:{
            id:schoolId
          }
        })
      }
    }

    return service;

  });
