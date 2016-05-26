// /app/public/ng-app/components/navigatormenu/index.js
'use strict';

var navigatormenuDirective  = require('./navigatormenu-directive');
var navigatormenuController = require('./navigatormenu-controller');


module.exports = angular
  .module('pb.navigatorMenu', [])
  .directive('pbNavigatorMenu', navigatormenuDirective)
  .controller('pb.navigatorMenu.navigatorMenuCtrl', navigatormenuController);


// EOF -------------------------------------------------------------------------
