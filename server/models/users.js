// /server/models/users.js
'use strict';

// Load packages ---------------------------------------------------------------
var mongoose = require('mongoose');


// Define Books model schema ---------------------------------------------------
var usersSchema = mongoose.Schema({
  twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String,
  }
});


// Export ----------------------------------------------------------------------
module.exports = mongoose.model('Users', usersSchema);


// EOF -------------------------------------------------------------------------
