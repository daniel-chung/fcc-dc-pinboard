// /app/public/ng-app/pages/paddpin/paddpin-controller.js
'use strict';

var pAddpinCtrl = function(Fetchpins, $http) {

  // $http service from angular
  this.http_ = $http;

  // Data models for our form
  this.pinaddForm = {
    'pinname': '',
    'url': ''
  };
}

pAddpinCtrl.prototype.pinadd = function(form) {

  var successCallback = function (response) {
    this.pinaddForm.pinname = '';
    this.pinaddForm.url     = '';
  };

  var errorCallback = function(response) {
    console.log(response.status);
  };

  // Add a new pin
  this.http_.post('/api/pinadd', this.pinaddForm).then(
    successCallback.bind(this),
    errorCallback.bind(this)
  );

  // Clear error messages on submit
  form.$setPristine();
  form.$setUntouched();
};

module.exports = pAddpinCtrl;


// EOF -------------------------------------------------------------------------
