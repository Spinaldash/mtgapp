'use strict';

let Expansion = require('../../models/expansion');
let async = require('async');
let _ = require('lodash');

module.exports = {
  handler: function(request, reply){
    Expansion.findOne({code:request.payload.code}, function(err, expansion) {
      let iterator = function(card, callback){
          if (!card.imageUrl) {
            let url = `http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${card.multiverseid}`;
            console.log('url is:', url)
            let filename = _.kebabCase(card.name) + '.jpeg';
            Expansion.download(url, filename, function(s3url){
              console.log('s3url is:', s3url);
              card.imageUrl = s3url;
              callback();
            });
          } else {
          callback();
        }
      };

      let finalFunc = function(err) {
        if (err){
          console.log('Error in the async final iterator');
          }
          console.log('FinalFunc is running');
          expansion.markModified('cards');
          expansion.save(function(){
            console.log('Save function has run');
            reply({expansion:expansion});
          });
      };

      async.each(expansion.cards, iterator, finalFunc);

    });
  }
};
