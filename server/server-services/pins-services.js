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

  // Fetches current user's pins ------------------------------------------ //
  // TODO(): limit to some number of pins (50?)
  this.getself = function (req, res) {
    console.log("inside pinservice getself");
    console.log('current user:', req.user);
    var currUsername = req.user.twitter.username;
    Pins.find(
      {"username": currUsername},
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


  // Deletes a user's pin ------------------------------------------------- //
  this.deletepin = function (req, res) {
    console.log("inside pinservice deletepin");
    console.log("delete pin param:", req.params);
    var currPinid = req.params.pinid;
    var currUsername = req.user.twitter.username;
    Pins.findOneAndRemove(
      {"_id": currPinid},
      function(err, pins) {
        if (err)
          throw err;

        // If there are no errors, return the user's data
        Pins.find(
          {"username": currUsername},
          function(err, pins) {
            if (err)
              throw err;
            res.json(pins);
        });

    });
  };


};


// Export the handler class ----------------------------------------------------
module.exports = PinsServices;


// EOF -------------------------------------------------------------------------
