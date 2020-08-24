'use strict';

angular.module('admin')
  .service('School', function ($http) {

    var service = {

      getAll: function(){
          return $http({
//            url: '/admin/schools/all',
            url:'http://peaceful-retreat-91246.herokuapp.com/api/robots',
            method:'GET',
            data:{}
          });
      },
      create: function(data){
        return $http({
//          url:"/admin/school/create",
            url:'http://peaceful-retreat-91246.herokuapp.com/api/robots',          
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
