'use strict';

let Expansion = require('../../models/expansion');


module.exports = {
  handler: function(request, reply){
    console.log('request is:', request.params.expCode);
    Expansion.find({code:request.params.expCode}, function(err, expansion) {
      reply({expansion:expansion});
    });
  }
};
