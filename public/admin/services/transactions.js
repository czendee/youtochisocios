'use strict';

angular.module('admin')
  .service('Transaction', function ($http) {

    var service = {

      getAll: function(data){
          return $http({
            url: '/admin/transactions/all',
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
          url:"/admin/transaction",
          method:'POST',
          data:data
        })
      }
    }

    return service;

  });
