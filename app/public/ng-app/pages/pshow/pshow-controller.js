// /app/public/ng-app/pages/pshow/pshow-controller.js
'use strict';

var pShowCtrl = function(Fetchpins, pinOwners) {

  this.title_ = '';
  if (pinOwners === 'self') {
    this.title_ = 'My pins';
  }
  else if (pinOwners === 'all') {
    this.title_ = 'All pins';
  }
  else {
    this.title_ = 'Pins by: ' + pinOwners;
  }

  // Fetchpins service
  this.fetchpins_ = Fetchpins;

  // Data model handling the pins to visualize
  this.pins_;

  // Connect to api
  this.getPins(pinOwners);
}


pShowCtrl.prototype.getPins = function(owners) {
  this.fetchpins_.getPins(owners).then(
    this.successCallback.bind(this),
    this.errorCallback.bind(this)
  );
};

pShowCtrl.prototype.successCallback = function(response) {
  this.pins_ = response.data;
};

pShowCtrl.prototype.errorCallback = function(response) {
  console.log(response.status);
};


module.exports = pShowCtrl;


// EOF -------------------------------------------------------------------------
