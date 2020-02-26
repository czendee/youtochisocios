"use strict";
(function(){

function transactionsController($scope, Student, $stateParams, $window, Transaction, notify) {
  console.log("working in transactions");
  var self = this;
  self.transactions = [];

  Transaction.getAll().then(function(data){
    self.transactions = data.data;
  })

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('transactions', {
        url: '/transactions',
        templateUrl: '/admin/transactions/transactions.html',
        controller: transactionsController,
        controllerAs : "transactionsController"
      });
  });

})();