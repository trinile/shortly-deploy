var db = require('../config');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var Schema = mongoose.Schema;


var urls = new Schema({
  url: { type: String, required: true },
  baseURL: { type: String, required: true },
  code: { type: String },
  title: { type: String },
  visits: { type: Number },
  created_at: Date,
  updated_at: Date
});

urls.methods.defaults = {
  visits: 0
};

urls.on('init', function(model, attrs, options) {
  console.log('in urls initi');
  // var shasum = crypto.createHash('sha1');
  // shasum.update(model.get('url'));
  // model.set('code', shasum.digest('hex').slice(0, 5));
});

var Link = mongoose.model('Link', urls);
// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },

//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
