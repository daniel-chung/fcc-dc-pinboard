// /server/services/pins-services.js
'use strict';

// Load packages ---------------------------------------------------------------
var Pins = require('../models/pins');


// Specify express routes ------------------------------------------------------
function PinsServices () {

  // Adds a pin to our database ------------------------------------------- //
  this.add = function (req, res) {
    console.log("inside Pinsservice add");
    console.log(req.body);
    console.log(req.user);

    var newPin      = new Pins();
    newPin.pinname  = req.body.pinname;
    newPin.url      = req.body.url;
    newPin.username = req.user.twitter.username;
    newPin.save(function(err) {
      if (err) 
        throw err;
      res.end();
    });
  };

  // Fetches all public pins ---------------------------------------------- //
  // TODO(): limit to some number of pins (50?)
  this.getall = function (req, res) {
    console.log("inside pinservice getall");
    Pins.find(
      {},
      function(err, pins) {
        if (err)
          throw err;
        res.json(pins);
      }
    );
  };

  // Fetches a user's pins ------------------------------------------------ //
  // TODO(): limit to some number of pins (50?)
  this.getuser = function (req, res) {
    console.log("inside pinservice get user");
    console.log(req.params);
    Pins.find(
      {"username": req.params.username},
      function(err, pins) {
        if (err)
          throw err;
        res.json(pins);
      }
    );
  };



};


// Export the handler class ----------------------------------------------------
module.exports = PinsServices;


// EOF -------------------------------------------------------------------------
