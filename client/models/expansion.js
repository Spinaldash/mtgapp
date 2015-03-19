'use strict';

angular.module('angular-prototype')
  .factory('Expansion', ['$http', function($http){

    function showCards(expCode){
      return $http.get('/expansion', expCode);
    }

    return {submit:submit};
  }]);
