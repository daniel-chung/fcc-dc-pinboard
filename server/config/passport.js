// /server/config/passport.js
'use strict';

// Set up ----------------------------------------------------------------------
var TwitterStrategy = require('passport-twitter').Strategy;


// Set up ----------------------------------------------------------------------
var User = require('../models/users');


// Expose this function to our app ---------------------------------------------
module.exports = function(passport) {


  // Serialize & Deserialize user ----------------------------------------- //
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


  // Twitter -------------------------------------------------------------- //
  passport.use(new TwitterStrategy({
    consumerKey:    process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL:    process.env.TWITTER_CALLBACK_URL
  },
  function(token, tokenSecret, profile, done) {
    User.findOne(
      {'twitter.id': profile.id},
      function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        }
        else {
          var newUser = new User();
          newUser.twitter.id = profile.id;
          newUser.twitter.token = token;
          newUser.twitter.username = profile.username;
          newUser.twitter.displayName = profile.displayName;
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      }
    );
  }));
};


// EOF -------------------------------------------------------------------------
