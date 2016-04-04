// var path = require('path');
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });


var mongoose = require('mongoose');
var mongodb = require('mongodb');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/mongo');
var db = mongoose.createConnection('mongodb://localhost/mongo');
// var users = new Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   created_at: Date,
//   updated_at: Date
// });

// var urls = new Schema({
//   url: { type: String, required: true },
//   baseURL: { type: String, required: true },
//   code: { type: String },
//   title: { type: String },
//   visits: { type: Number },
//   created_at: Date,
//   updated_at: Date
// });

module.exports = db;
