"use strict";

(function(){

    function navbarController($scope, AdminService) {
        self = this;

        self.role=AdminService.role;
        self.grade=AdminService.grade;
    }

    angular.module('admin')
      .directive('navbar', function() {
        return {
            templateUrl: '/admin/directives/navbar/navbar.html',
            restrict: 'E',
            controller: navbarController,
            controllerAs: 'navbarController'
        };
      });

})();
