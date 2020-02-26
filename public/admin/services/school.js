'use strict';

angular.module('admin')
  .service('School', function ($http) {

    var service = {

      getAll: function(){
          return $http({
            url: '/admin/schools/all',
            method:'GET',
            data:{}
          });
      },
      create: function(data){
        return $http({
          url:"/admin/school/create",
          method:'POST',
          data:data
        })
      },
      destroy: function(schoolId){
        return $http({
          url:"/admin/school/delete",
          method:'POST',
          data:{
            id:schoolId
          }
        })
      }
    }

    return service;

  });
