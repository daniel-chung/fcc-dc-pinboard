// /app/app.js
'use strict';

// Browserify ------------------------------------------------------------------
// Angular
var angular    = require('angular');
var ngUiRouter = require('angular-ui-router');
var ngAnimate  = require('angular-animate');
var ngAria     = require('angular-aria');
var ngMessages = require('angular-messages');
var ngMaterial = require('angular-material');

// Pages
var pLanding  = require('./pages/planding');
var pShow     = require('./pages/pshow');
var pAddpin   = require('./pages/paddpin');
var pRegister = require('./pages/pregister');

// Components
var navigator = require('./components/navigator');

// Services
var sFetchpins = require('./services/fetchpins');


// Define angular module -------------------------------------------------------
// Use namespace 'pb' for pinboard
var Application = angular.module('pb.application', [
    ngUiRouter,
    ngAnimate,
    ngAria,
    ngMessages,
    ngMaterial,
    pLanding.name,
    pShow.name,
    pAddpin.name,
    pRegister.name,
    navigator.name,
    sFetchpins.name
]);


// Provide authentication checks on state change
Application.run(function ($rootScope, $state, $http, $q) {
  $rootScope.$on('$stateChangeStart', 
    function (event, toState, toParams, fromState, fromParams, options) {

      // Create a call back function to provide async functionality
      function routeChangeCb() {
        var deferred = $q.defer();
        $http.get('/auth/isloggedin')
          .success(function (data, status) {
            if (status === 200) {
              deferred.resolve(data);
            }
            else {
              deferred.reject(data);
            }
          })
          .error(function (data) {
            deferred.reject(data);
          });
        return deferred.promise;
      }

      routeChangeCb()
        .then(function(isLoggedIn) {

          // Redirect based on authentication
          if (toState.access.restricted && isLoggedIn === false) {
            $state.go('pshow');
          }
        })
        .catch(function () {
          console.log('error');
        });
  });
});


// Define Routing --------------------------------------------------------------
Application.config(function ($stateProvider, $urlRouterProvider) {

  // Default to the root
  $urlRouterProvider.otherwise("/");

  $urlRouterProvider.when("/", "/all");

  // Configure the states for Angular UI Routing
  $stateProvider
    .state('planding', {
      url: "/testlanding",
      templateUrl: "ng-app/pages/planding/planding.html",
      controller: 'pb.planding.plandingCtrl',
      controllerAs: 'plandingCtrl',
      access: {restricted: false}
    })
    // Make this an abstract class?
    .state('pshow', {
      url: "/",
      abstract: true,
      templateUrl: "ng-app/pages/pshow/pshow-shell.html",
      access: {restricted: false}
    })
      .state('pshow.all', {
        url: "all",
        resolve: {
          pinOwners: function() { return 'all'; }
        },
        templateUrl: "ng-app/pages/pshow/pshow.html",
        controller: 'pb.pshow.pshowCtrl',
        controllerAs: 'pshowCtrl',
        access: {restricted: false}
      })
      
      .state('pshow.username', {
        url: "user/:username",
        resolve: {
          pinOwners: function($stateParams) { 
            return $stateParams.username;
          }
        },
        templateUrl: "ng-app/pages/pshow/pshow.html",
        controller: 'pb.pshow.pshowCtrl',
        controllerAs: 'pshowCtrl',
        access: {restricted: false}
      })

      .state('pshow.self', {
        url: "self",
        resolve: {
          pinOwners: function() {
            return 'self';
          }
        },
        templateUrl: "ng-app/pages/pshow/pshow.html",
        controller: 'pb.pshow.pshowCtrl',
        controllerAs: 'pshowCtrl',
        access: {restricted: true}
      })

    .state('paddpin', {
      url: "/paddpin",
      templateUrl: "ng-app/pages/paddpin/paddpin.html",
      controller: 'pb.paddpin.paddpinCtrl',
      controllerAs: 'paddpinCtrl',
      access: {restricted: true}
    })
    .state('pregister', {
      url: "/pregister",
      templateUrl: "ng-app/pages/pregister/pregister.html",
      controller: 'pb.pregister.pregisterCtrl',
      controllerAs: 'pregisterCtrl',
      access: {restricted: false}
    })
    ;
});


// EOF -------------------------------------------------------------------------
