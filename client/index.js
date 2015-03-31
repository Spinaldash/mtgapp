'use strict';

angular.module('angular-prototype', ['ui.router', 'ngMessages', 'ui.bootstrap', 'ngAnimate'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {url:'/', templateUrl:'/views/general/home.html', controller:'HomeCtrl'})

  }]);
  // .run(['$rootScope', 'User', function($rootScope, User){
  //   User.status().then(function(response){
  //     $rootScope.email = response.data.email;
  //   });
  // }]);
