// /app/public/ng-app/services/fetchpins/fetchpins-service.js
'use strict';

var FetchpinsService = function($http) {
  // Bind Angular's HTTP service to our service for functional prototypes
  this._http = $http;
};

FetchpinsService.prototype.getPins = function(filter) {
  var apiUrl = '/api/pinshow/' + filter;
  return this._http.get(apiUrl);
};

module.exports = FetchpinsService;


// EOF -------------------------------------------------------------------------
