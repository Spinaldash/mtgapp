'use strict';

let Expansion = require('../../models/expansion');


module.exports = {
  handler: function(request, reply){
    console.log('In the expansion route js ect. ');
    console.log('request is:', request.payload.code);
    Expansion.find({code:request.payload.code}, function(err, expansion) {
      console.log('Result of find:', expansion);
      expansion[0].cards.forEach(function(card){
          console.log("Running forEach. This:", card);
          if (!card.imageUrl) {
            url = `http://api.mtgdb.info/content/card_images/${card.multiverseid}.jpeg`;
            filename = card.name
            console.log("This card is found at:", url);
            Expansion.download(url, filename);
          }
      });
      reply({expansion:expansion});
    });
  }
};
