// /server/models/users.js
'use strict';

// Load packages ---------------------------------------------------------------
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


// Define Books model schema ---------------------------------------------------
var usersSchema = mongoose.Schema({
  twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String
  },
  local: {
    email: String,
    password: String,
    username: String
  }
});


// Encryption ethods -----------------------------------------------------------
usersSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

usersSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


// Export ----------------------------------------------------------------------
module.exports = mongoose.model('Users', usersSchema);


// EOF -------------------------------------------------------------------------
