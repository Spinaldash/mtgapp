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

expansionSchema.statics.download = function(url, fileName, cb){
  var s3 = new AWS.S3();
  var s3url = 'https://s3-us-west-1.amazonaws.com/' + process.env.AWS_BUCKET + '/' + fileName;
  request({url: url, encoding:null}, function(err, response, body){
    var params = {Bucket: process.env.AWS_BUCKET, Key: fileName, Body: body, ACL: 'public-read'};
    s3.putObject(params, function(){
      cb(s3url);
    });
  });
};

Expansion = mongoose.model('Expansion', expansionSchema, 'brewCards');
module.exports = Expansion;
