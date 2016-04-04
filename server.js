// /server.js
'use strict';

// Load packages ---------------------------------------------------------------
var express         = require('express');
var session         = require('express-session');
var cookieParser    = require('cookie-parser');
var morgan          = require('morgan');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var passport        = require('passport');
var dotenv          = require('dotenv');


// allows us to use .env for security
dotenv.load();


// Setup Node.js and Express.js ------------------------------------------------
var app  = express();
var port = process.env.PORT || 8080;


// Setup Mongoose --------------------------------------------------------------
mongoose.connect((process.env.MONGOLAB_URI || process.env.MONGO_URI) + "/pin");


// Other configurations
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  httpOnly: false,
}));


// Passport setup --------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./server/config/passport')(passport);


// Routing links ---------------------------------------------------------------
// set the static files location; /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
app.use('/ng-app', express.static(__dirname + '/ng-app'));


// Setup Express routes --------------------------------------------------------
require('./server/routes')(app, passport);


// Start server ----------------------------------------------------------------
app.listen(port, function() {
  console.log('Node.js listening on port ' + port);
});


// EOF -------------------------------------------------------------------------
