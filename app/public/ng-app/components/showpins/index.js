// /app/public/ng-app/components/showpins/index.js
'use strict';

var showpinsDirective  = require('./showpins-directive');
var showpinsController = require('./showpins-controller');

module.exports = angular
  .module('pb.showpins', [])
  .directive('pbShowpins', showpinsDirective)
  .controller('pb.showpins.showpinsCtrl', showpinsController);


// EOF -------------------------------------------------------------------------
