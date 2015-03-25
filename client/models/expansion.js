'use strict';

angular.module('angular-prototype')
  .factory('Expansion', ['$http', function($http){

    function showCards(expCode){
      console.log('expCode is:', expCode);
      return $http.post('/expansion',  {code:expCode});
    }

    return {showCards:showCards};
  }]);
