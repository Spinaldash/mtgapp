'use strict';

var mongoose = require('mongoose');
var request = require('request');
var AWS = require('aws-sdk');
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

expansionSchema.statics.download = function(url, fileName){
  var s3 = new AWS.S3();
  request({url: url, encoding:null}, function(err, response, body){
    var params = {Bucket: process.env.AWS_BUCKET, Key: fileName, Body: body, ACL: 'public-read'};
    s3.putObject(params);
  });
};

Expansion = mongoose.model('Expansion', expansionSchema, 'brewCards');
module.exports = Expansion;
