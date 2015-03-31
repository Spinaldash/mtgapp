'use strict';

angular.module('angular-prototype')
  .filter('colorFilter', function() {
    return function (cards, color, type, rarity){
      var filtered = [];
      if (!cards) { return filtered;}
      filtered = cards.filter(function(card){
        switch (color) {
          case undefined:
            return true;
          case 'Colorless': // If colorless is specified, return cards with no color
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
          var rarityMatch = new RegExp(rarity);
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

    $scope.resetCards = function() {
          $scope.cards = []; // Clear Cards from stage
          delete $scope.disabledButtons; //Undisable set buttons
          $scope.setClicked = null; // fix set display
    };

    $scope.buttonDisable = function(setName) {
      if (!$scope.disabledButtons) { $scope.disabledButtons = {};}
      $scope.disabledButtons[setName] = true;
      $scope.setClicked = '../../images/png/' + setName + '.png'; // Shows Last Set image
    }

    $scope.toggleNav = function() {
      $('body').toggleClass('show-nav');
    }

    $scope.lastColorClicked = function(color) {
      $scope.setClicked = '../../images/png/' + color + '.png';
    }

}]);
