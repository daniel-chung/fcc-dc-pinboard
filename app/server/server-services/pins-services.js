// /server/services/pins-services.js
'use strict';

// Load packages ---------------------------------------------------------------
var Pins  = require('../models/pins');
var Users = require('../models/users');


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
    newPin.username = req.user.hasOwnProperty('twitter') ?
      req.user.twitter.username : req.user.local.username;
    newPin.likescount = 0;
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
    var currUsername = req.user.hasOwnProperty('twitter') ?
      req.user.twitter.username : req.user.local.username;
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
    var currUsername = req.user.hasOwnProperty('twitter') ?
      req.user.twitter.username : req.user.local.username;
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


  // Likes a user's pin --------------------------------------------------- //
  this.likePin = function (req, res) {
    console.log('req user', req.user._id);
    console.log('like pin', req.body);
    var userId = req.user._id;
    var pinId = req.body.pinId;

    Users.find(
      { '_id': userId, 'likes': pinId },
      function(err, user) {
        if (err)
          console.log('err', err);

        console.log('user', user, user.length);
        // Add a like
        if (user.length == 0) {
          addLike(userId, pinId, res);
        }
        // Remove the like
        else {
          removeLike(userId, pinId, res);
        }
      }
    );

    res.end();
  };


};


// Helper functions -------------------------------------------------
function addLike(userId, pinId, res) {
  Users.findByIdAndUpdate(
    userId,
    { $push: { likes: pinId } },
    function (err, user) {
      if (err)
        throw err;
      if (!user)
        throw err;
      Pins.findByIdAndUpdate(
        pinId,
        { $inc: { likescount: 1 } },
        function (err, pins) {
          if (err)
            throw err;
          res.end();
        });
    });
};

function removeLike(userId, pinId, res) {
  Users.findByIdAndUpdate(
    userId,
    { $pop: { likes: pinId } },
    function (err, user) {
      if (err)
        throw err;
      if (!user)
        throw err;
      Pins.findByIdAndUpdate(
        pinId,
        { $inc: { likescount: -1 } },
        function (err, pins) {
          if (err)
            throw err;
          res.end();
        });
    });
};



// Export the handler class ----------------------------------------------------
module.exports = PinsServices;


// EOF -------------------------------------------------------------------------
