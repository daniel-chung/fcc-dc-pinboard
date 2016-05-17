// /app/public/ng-app/services/fetchpins/index.js
'use strict';

var FetchpinsService = require('./fetchpins-service');

module.exports = angular
  .module('pb.fetchpins', [])
  .service('Fetchpins', FetchpinsService);

// EOF -------------------------------------------------------------------------
