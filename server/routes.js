// /server/routes.js
'use strict';

// Load packages ---------------------------------------------------------------
var PinsServices = require('./server-services/pins-services.js');


// Specify express routes ------------------------------------------------------
module.exports = function(app, passport) {

  // Services ------------------------------------------------------------- //
  var pinsService = new PinsServices();

  // Client routes
  app.route('/')
    .get(function(req, res) {
      res.sendFile("index.html");
    });

  // Authentication routes ------------------------------------------------ //
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter',
      { successRedirect: '/',
        failureRedirect: '/login' }));
  app.route('/auth/isloggedin')
    .get(function(req, res) {
      res.send(req.isAuthenticated());
    });


  // API routes ----------------------------------------------------------- //
  app.route('/api/pinadd')
    .post(pinsService.add);

  app.route('/api/pinshow/all')
    .get(pinsService.getall);

  app.route('/api/pinshow/:username')
    .get(pinsService.getuser);

}

// EOF -------------------------------------------------------------------------
