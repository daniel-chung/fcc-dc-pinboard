// /server/config/passport.js
'use strict';

// Set up ----------------------------------------------------------------------
var TwitterStrategy = require('passport-twitter').Strategy;
var LocalStrategy = require('passport-local').Strategy;


// Set up ----------------------------------------------------------------------
var User = require('../models/users');


// Expose this function to our app ---------------------------------------------
var PassportConfig = function(passport) {

  // Serialize & Deserialize user ----------------------------------------- //
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function(user, cb) {
    cb(null, user);
  });


  // Twitter -------------------------------------------------------------- //
  passport.use(new TwitterStrategy({
    consumerKey:    process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL:    process.env.TWITTER_CALLBACK_URL
  },
  function(token, tokenSecret, profile, cb) {
    User.findOne(
      {'twitter.id': profile.id}, function(err, user) {
        if (err)
          return cb(err);
        if (user) {
          return cb(null, user);
        }
        else {
          var newUser = new User();
          newUser.twitter.id = profile.id;
          newUser.twitter.token = token;
          newUser.twitter.username = profile.username;
          newUser.twitter.displayName = profile.displayName;
          newUser.likes = [];
          newUser.save(function(err) {
            if (err)
              throw err;
            return cb(null, newUser);
          });
        }
      }
    );
  }));


  // Local Sign up -------------------------------------------------------- //
  passport.use('local-signup', new LocalStrategy({
    usernameField:    'email',
    passwordField:    'password',
    passReqToCallback: true
  },
  function(req, email, password, cb) {
    User.findOne(
      {'local.email': email}, function(err, user) {
        if (err)
          return cb(err);
        if (user) {
          return cb(null, user);
        }
        else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.username = /^\w+@/.exec(email)[0];
          newUser.local.password = newUser.generateHash(password);
          newUser.likes = [];
          newUser.save(function(err) {
            if (err)
              throw err;
            return cb(null, newUser);
          });
        }
      }
    );
  }));

  // Local Register ------------------------------------------------------- //
  passport.use('local-login', new LocalStrategy({
    usernameField:    'email',
    passwordField:    'password',
    passReqToCallback: true
  },
  function(req, email, password, cb) {
    User.findOne(
      {'local.email': email}, function(err, user) {
        if (err)
          return cb(err);
        if (!user) {
          console.log(user);
          return cb(null, false);
        }
        if (!user.validPassword(password)) {
          return cb(null, false);
        }
        return cb(null, user);
      }
    );
  }));

}; // End passportConfig


module.exports = PassportConfig;


// EOF -------------------------------------------------------------------------
