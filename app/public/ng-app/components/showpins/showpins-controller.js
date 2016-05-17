// /app/public/ng-app/components/showpins/showpins-controller.js
'use strict';

var showpinsController = function(Fetchpins, $scope) {

  // Fetchpins service
  this.fetchpins_ = Fetchpins;


  // Data passed in from the directive
  this.owners_ = $scope.owners;

  // Data model handling the pins to visualize
  this.pins_;

  // Connect to api
  this.getPins(this.owners_);
}

showpinsController.prototype.getPins = function(owners) {
  this.fetchpins_.getPins(owners).then(
    this.successCallback.bind(this),
    this.errorCallback.bind(this)
  );
};

showpinsController.prototype.successCallback = function(response) {
  this.pins_ = response.data;
};
showpinsController.prototype.errorCallback = function(response) {
  console.log(response.status);
};


module.exports = showpinsController;


// EOF -------------------------------------------------------------------------
