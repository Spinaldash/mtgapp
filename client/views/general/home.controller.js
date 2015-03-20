'use strict';

angular.module('angular-prototype')
  .controller('HomeCtrl', ['$scope', '$state', 'Expansion', function($scope, $state, Expansion){


    $scope.submit = function(code) {

      Expansion.showCards(code)
      .then(function(response) {
        $scope.cards = response.data.expansion[0].cards;
      });
    };

}]);
