// /app/public/ng-app/pages/pshow/pshow-controller.js
'use strict';

var pShowCtrl = function(Fetchpins, pinOwners,
    $state, $scope, $window, $mdToast, $mdDialog) {

  // Services -------------------------------------------------------
  this.mdDialog_ = $mdDialog;
  this.mdToast_ = $mdToast;
  this.state_ = $state;
  this.fetchpins_ = Fetchpins;

  // Resolved data from Angular UI Router ---------------------------
  this.owners_ = pinOwners;

  this.isLoggedIn_ = false;
  this.fetchpins_.isLoggedIn().then(
    (function(res) {
      this.isLoggedIn_ = res.data
    }).bind(this),
    function(err) {
      console.log('err', err);
    }
  );

  // Data models ----------------------------------------------------
  // Title to display
  this.title_ = this.formatTitle(this.owners_);

  // Calculate the appropriate number of columns to show
  this.columns_ = this.calculateColumns($window.outerWidth);

  // Retrieve the list of pins
  this.getPins(this.owners_);

  // Create an object of lists that contains the distributed pins
  // for a grid layout view and then populate the object
  this.pins_ = {};
  this.distributePins();


  // Bind window resize element to our digest cycle
  angular.element($window).bind('resize', function(){
    $scope.$digest();
  });

  // watch for changes in window size
  $scope.$watch(
    function() {
      return $window.outerWidth;
    },
    (function(newValue, oldValue) {
      this.columns_ = this.calculateColumns(newValue);
    }).bind(this)
  );

  // Watch for changes in column counts
  $scope.$watch(
    (function() {
      return this.columns_;
    }).bind(this),
    (function(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.distributePins();
        this.getPins(this.owners_);
      }
    }).bind(this)
  );
};


// Get pins ---------------------------------------------------------
pShowCtrl.prototype.getPins = function(owners) {
  this.fetchpins_.getPins(owners).then(
    this.successCallback.bind(this),
    this.errorCallback.bind(this)
  );
};
pShowCtrl.prototype.successCallback = function(response) {
  for (var i = 0; i < response.data.length; i++) {
    this.pins_[i % this.columns_].push(response.data[i]);
  }
};
pShowCtrl.prototype.errorCallback = function(err) {
  console.log('Error:', err);
};

// Delete -----------------------------------------------------------
pShowCtrl.prototype.delete = function(id) {
  this.fetchpins_.deletePin(id).then(
    this.reloadCallback.bind(this),
    this.reloadCallback.bind(this)
  );
};

// Like button ------------------------------------------------------
pShowCtrl.prototype.like = function(id, event) {
  if (this.isLoggedIn_) {
    this.fetchpins_.likePin(id).then(
      this.reloadCallback.bind(this),
      this.reloadCallback.bind(this)
    );
  }
  else {
    this.loginAlert(event);
  }
};

// Reload callbacks -------------------------------------------------
pShowCtrl.prototype.reloadCallback = function(res) {
  this.state_.reload();
};

// Show toast -------------------------------------------------------
pShowCtrl.prototype.loginAlert = function($ev) {
  this.mdDialog_.show(
    this.mdDialog_.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Not logged in')
      .textContent('You must be logged in to vote on pins')
      .ariaLabel('Must be logged in')
      .ok('Got it!')
      .targetEvent($ev)
    );
};

// Other methods ----------------------------------------------------
pShowCtrl.prototype.distributePins = function() {
  this.pins_ = {};
  for (var j = 0; j < this.columns_; j++) {
    if (!(this.pins_.hasOwnProperty(j)))
      this.pins_[j] = [];
  }
};

pShowCtrl.prototype.formatTitle = function(owner) {
  if (owner === 'self') {
    return 'My pins';
  }
  else if (owner === 'all') {
    return 'All pins';
  }
  else {
    return 'Pins by: ' + owner;
  }
}

pShowCtrl.prototype.calculateColumns = function(width) {
  return Math.floor(width / 250);
};

module.exports = pShowCtrl;


// EOF -------------------------------------------------------------------------
