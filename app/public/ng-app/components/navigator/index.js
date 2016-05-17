// /app/public/ng-app/components/navigator/index.js
'use strict';

var navigatorDirective  = require('./navigator-directive');
var navigatorController = require('./navigator-controller');

module.exports = angular
  .module('pb.navigator', [])
  .directive('pbNavigator', navigatorDirective)
  .controller('pb.navigator.navigatorCtrl', navigatorController);


// EOF -------------------------------------------------------------------------
