// /server/routes.js
'use strict';

// Load packages ---------------------------------------------------------------
var PinsServices = require('./server-services/pins-services.js');


// Specify express routes ------------------------------------------------------
var ExpressRoutes = function(app, passport) {

  // Services ------------------------------------------------------------- //
  var pinsService = new PinsServices();

  // Client routes
  app.route('/')
    .get(function(req, res) {
      res.sendFile("index.html");
    });

  // Authentication routes ------------------------------------------------ //
  app.get('/auth/twitter',
    passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter',
      { successRedirect: '/#/self',
        failureRedirect: '/#/' }));

  app.post('/auth/local/signup',
    passport.authenticate('local-signup',
      { successRedirect: '/#/self',
        failureRedirect: '/#/pregister' }));

  app.post('/auth/local/login',
    passport.authenticate('local-login',
      { successRedirect: '/#/self',
        failureRedirect: '/#/pregister' }));

  app.route('/auth/isloggedin')
    .get(function(req, res) {
      console.log('inside isloggedin');
      console.log('req.isAuthenticated', req.isAuthenticated());
      res.send(req.isAuthenticated());
    });

  app.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // API routes ----------------------------------------------------------- //
  app.route('/api/pinadd')
    .post(pinsService.add);

  app.route('/api/pinshow/all')
    .get(pinsService.getall);

  app.route('/api/pinshow/self')
    .get(pinsService.getself);

  app.route('/api/pinshow/:username')
    .get(pinsService.getuser);

  app.route('/api/pindelete/:pinid')
    .delete(pinsService.deletepin);

  app.route('/api/like')
    .post(pinsService.likePin);
}


module.exports = ExpressRoutes;


// EOF -------------------------------------------------------------------------
