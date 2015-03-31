'use strict';

angular.module('angular-prototype', ['ui.router', 'ngMessages', 'ui.bootstrap', 'ngAnimate'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('splash', {url:'/', templateUrl:'/views/general/splash.html', controller:'HomeCtrl'})
    .state('home', {url:'/home', templateUrl:'/views/general/home.html', controller:'HomeCtrl'})
    .state('about', {url:'/about', templateUrl:'/views/general/about.html', controller:'HomeCtrl'})

  }]);
  // .run(['$rootScope', 'User', function($rootScope, User){
  //   User.status().then(function(response){
  //     $rootScope.email = response.data.email;
  //   });
  // }]);
