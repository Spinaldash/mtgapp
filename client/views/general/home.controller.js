'use strict';

angular.module('angular-prototype')
  .filter('codeBlue', function() {
    return function (cards, color){
      var filtered = [];
      filtered = cards.filter(function(card){
        if(!card.colors){return false;}
        return _.includes(card.colors, color);
      });

      return filtered;
    }
  })
  .controller('HomeCtrl', ['$scope', '$state', 'Expansion', function($scope, $state, Expansion){

    $scope.cards = {};
    $scope.submit = function(code) {

      Expansion.showCards(code)
      .then(function(response) {
        $scope.cards[code.code] = response.data.expansion.cards;
      });
    };

}]);
