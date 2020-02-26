'use strict';

angular.module('admin', [
  'ui.router',
  'ngCookies',
  'angularUtils.directives.dirPagination',
  'ngToast',
  'cgNotify'

]).config(function($urlRouterProvider, $locationProvider, $stateProvider, ngToastProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('logout', {
        url: '/logout',
        template: '',
        controller: function(){
            window.location.replace("/logout");
        }
    });

    ngToastProvider.configure({
        animation: 'slide',
        //horizontalPosition: 'left',
        //verticalPosition: 'bottom' // or 'fade'
    });
})
