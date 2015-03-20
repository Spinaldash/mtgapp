'use strict';

var mongoose = require('mongoose');
var Expansion;

var expansionSchema = mongoose.Schema({
    name: {type: String},
    code: {type: String},
    releaseDate: {type: String},
    border: {type: String},
    type: {type: String},
    block: {type: String},
    booster: [],
    cards: []
});

Expansion = mongoose.model('Expansion', expansionSchema, 'brewCards');
module.exports = Expansion;
