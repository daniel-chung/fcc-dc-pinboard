// /app/public/ng-app/pages/paddpin/paddpin-controller.js
'use strict';

var pAddpinCtrl = function(Fetchpins, $http, $mdDialog, $state) {

  // $http service from angular
  this.http_ = $http;
  this.mdDialog_ = $mdDialog;
  this.state_ = $state;

  // Data models for our form
  this.pinaddForm = {
    'pinname': '',
    'url': ''
  };
};


pAddpinCtrl.prototype.pinadd = function(form) {

  // Helper callback functions
  var successCallback = function(response) {
    this.pinaddForm.pinname = '';
    this.pinaddForm.url = '';
    this.addpinAlert();
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

pAddpinCtrl.prototype.addpinAlert = function() {

  // Helper callback functions
  var mdDialogCallback = function(transitionToState) {
    this.state_.go(transitionToState);
  };

  // Dialog setup
  var confirm = this.mdDialog_.confirm()
      .title('Successfully added a pin!')
      .textContent('Do you want to add a new pin or return to your pins page?')
      .ariaLabel('Added pin')
      .ok('Show my pins')
      .cancel('Add another pin');

  this.mdDialog_.show(confirm).then(
    mdDialogCallback.bind(this, 'pshow.self'),
    mdDialogCallback.bind(this, 'paddpin')
  );
};


module.exports = pAddpinCtrl;


// EOF -------------------------------------------------------------------------
