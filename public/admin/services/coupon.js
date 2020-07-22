'use strict';

angular.module('admin')
  .service('Coupon', function ($http) {

    var service = {

      getAll: function(data){
          return $http({
            url: '/admin/coupons/all',
            method:'POST',
            data:data
            /*params: {
              page_number:pageNumber,
              numberOfEntries:numberOfEntries
            }*/
          });
      },
      getById: function(data){
        return $http({
          url:"/admin/coupon",
          method:'POST',
          data:data
        })
      },
      create: function(data){
        return $http({
          url:"/admin/coupon/create",
          method:'POST',
          data:data
        })
      },
      update: function(data){
        return $http({
          url:"/admin/coupon/update",
          method:'POST',
          data:data
        })
      },
      delete: function(data){
        return $http({
          url:"/admin/coupon/delete",
          method:'POST',
          data:data
        })
      },
      findCouponByConcurso: function(data){
        return $http({
          url:"/admin/coupon/searchconcurso",
          method:'POST',
          params: {
            concursocode:data
          }          
        })
      }      ,
      getAllConcursos: function(){
          return $http({
            url: '/admin/concursos/all',
            method:'GET',
            data:{}
          });
      }

    
    }

    return service;

  });
