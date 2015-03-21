'use strict';

angular.module('angular-prototype')
  .controller('HomeCtrl', ['$scope', '$state', 'Expansion', function($scope, $state, Expansion){

    $scope.cards = {};
    $scope.submit = function(code) {

      Expansion.showCards(code)
      .then(function(response) {
        debugger;
        $scope.cards[code.code] = response.data.expansion.cards;
      });
    };

}]);
