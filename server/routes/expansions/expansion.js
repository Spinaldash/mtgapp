'use strict';

let Expansion = require('../../models/expansion');
let async = require('async');

module.exports = {
  handler: function(request, reply){
    console.log('In the expansion route js ect. ');
    console.log('request is:', request.payload.code);
    Expansion.find({code:request.payload.code}, function(err, expansion) {
      console.log('Result of find:', expansion);

      let iterator = function(card, callback){
          console.log('Running iterator. This:', card);
          if (!card.imageUrl) {
            let url = `http://api.mtgdb.info/content/card_images/${card.multiverseid}.jpeg`;
            let filename = card.name;
            console.log('This card is found at:', url);
            // Expansion.download(url, filename);
          }
          callback();
      };

      let finalFunc = function(err) {
        if (err){
          console.log('Error in the async final iterator');
          }
        reply({expansion:expansion});
      };

      async.each(expansion[0].cards, iterator(card, callback), finalFunc(err));

    });
  }
};
