'use strict';

angular.module('angular-prototype')
  .filter('colorFilter', function() {
    return function (cards, color, type, rarity){
      var filtered = [];
      console.log('color is:', color);
      console.log('type is:', type);
      console.log('rarity is:', rarity);
      // if (!color){return true;} //If no color is specified, do not filter by color
      filtered = cards.filter(function(card){
        switch (color) {
          case undefined:
            console.log('undefined');
            return true;
          case 'Colorless': // If colorless is specified, return cards with no color
            // if(card.type === 'Land'){return false;} // throw out nonbasic lands
            // if(_.startsWith(card.type, 'Basic')){return false;} // throws out basic lands
            if(/Land/i.test(card.type)){return false;} // throws outs all lands
            if(!card.colors){return true;}
            break;
          case 'Land':
            if(_.startsWith(card.type, 'Basic')){return false;}
            if(/Land/i.test(card.type)){return true;}
            break;
          case 'Legendary':
            if(/Legend/i.test(card.type)){return true;}
            break;
          case 'White':
          case 'Blue':
          case 'Black':
          case 'Red':
          case 'Green':
            if(!card.colors){return false;}
            return _.includes(card.colors, color);
          default:
            console.log('default');
            return true;
        }
      });
      if(type){
        filtered = filtered.filter(function(card){
          var typeMatch = new RegExp(type, 'i');
          if (typeMatch.test(card.type)){return true;}
        });
      }
      if(rarity){
        filtered = filtered.filter(function(card){
          var rarityMatch = new RegExp(rarity, 'i');
          if (rarityMatch.test(card.rarity)){return true;}
        });
      }

      return filtered;
    };
  })

  .controller('HomeCtrl', ['$scope', '$state', 'Expansion', function($scope, $state, Expansion){

    $scope.isCollapsed = false;
    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };

    $scope.submit = function(code) {
      Expansion.showCards(code)
      .then(function(response) {
        if(!$scope.cards) {
          $scope.cards = [];
        }
        $scope.cards = $scope.cards.concat(response.data.expansion.cards)
      });
    };

}]);
