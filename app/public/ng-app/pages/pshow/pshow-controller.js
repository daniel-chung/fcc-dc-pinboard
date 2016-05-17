// /app/public/ng-app/pages/pshow/pshow-controller.js
'use strict';

var pShowCtrl = function(Fetchpins, pinOwners, $http, $state) {

  this.http_ = $http;
  this.state_ = $state;

  this.owners_ = pinOwners;

  this.title_ = '';
  if (this.owners_ === 'self') {
    this.title_ = 'My pins';
  }
  else if (this.owners_ === 'all') {
    this.title_ = 'All pins';
  }
  else {
    this.title_ = 'Pins by: ' + this.owners_;
  }

  // Fetchpins service
  this.fetchpins_ = Fetchpins;

  // Data model handling the pins to visualize
  this.pins_;

  // Connect to api
  this.getPins(this.owners_);
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

pShowCtrl.prototype.delete = function(id) {
  var deleteUrl = '/api/pindelete/' + id;
  this.http_.delete(deleteUrl).then(
    (function(res) {
      this.state_.reload();
    }).bind(this),
    (function(err) {
      console.log('error callback', err);
      this.state_.reload();
    }).bind(this)
  );
}

module.exports = pShowCtrl;


// EOF -------------------------------------------------------------------------
