var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
// var mongodb = require('mongodb');
var Schema = mongoose.Schema;

var users = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', users);

users.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.find('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

users.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.find('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    }
  );
};

var newUser = new User({
  username: "trini",
  password: "hello"
});

console.log(newUser);

// newUser.save(function (err, userObj) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('saved successfully:', userObj);
//   }
// });

users.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
      return next();
    }
    // generate a salt
    this.
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
// ({
  // tableName: 'users',
  // hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// var express = require('express');
// var app = express();
// app.get('/users',function(req, res) {
//   mongoose.model('users', function(err, users) {
//     if (err) {
//       console.log('error in getting users');
//       console.log(err);
//       res.send(err);
//     }
//     res.send(users);
//   });
// });


module.exports = User;






