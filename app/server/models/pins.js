// /server/models/pins.js
'use strict';

// Load packages ---------------------------------------------------------------
var mongoose = require('mongoose');


// Define Books model schema ---------------------------------------------------
var pinsSchema = mongoose.Schema({
  pinname    : String,
  thumbnail  : String,
  url        : String,
  username   : String,
  likescount : Number
});


// Export ----------------------------------------------------------------------
module.exports = mongoose.model('Pins', pinsSchema);


// EOF -------------------------------------------------------------------------
