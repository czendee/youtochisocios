'use strict';

angular.module('admin')
  .service('Student', function ($http) {

    var service = {

      getStudents: function(customerId){
          return $http({
            url: '/admin/students/all',
            method:'GET'
            /*params: {
              page_number:pageNumber,
              numberOfEntries:numberOfEntries
            }*/
          });
      },
      getStudent: function(id){
        return $http({
          url:"/admin/student",
          method:'GET',
          params: {
            id:id
          }
        })
      },
      moderatorEvaluate: function(data){
        return $http({
          url:"/admin/student/evalue-moderator",
          method:'POST',
          data:data
        })
      },
      
      moderatorReject: function(data){
        return $http({
          url:"/admin/student/evalue-moderator-reject",
          method:'POST',
          data:data
        })
      },

      evaluateStudentEssay: function(data){
        return $http({
          url:"/admin/student/evaluate-essay",
          method:"POST",
          data:data
        })
      },
      getFinalists: function(data){
        return $http({
          url:"/admin/student/finalists",
          method:"POST",
          data:data
        })
      },
      finalEvaluate: function(data){
        return $http({
          url:"/admin/student/select-finalist",
          method:"POST",
          data:data
        })
      },
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
