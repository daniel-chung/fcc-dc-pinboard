// /app/public/ng-app/components/navigator/navigator-controller.js
'use strict';

var navigatorController = function($http, $q) {

  // Model to keep track of logged in status
  this.loggedIn = false;
 
  // Call the call back
  this.authCallBack($q, $http).then(
    (function(isLoggedIn) {
      this.loggedIn = isLoggedIn;
    }).bind(this)
  )
  .catch(function () {
    console.log('authcall back error');
  });
};


// Authentication callback
navigatorController.prototype.authCallBack = function($q, $http) {
  
  var deferred = $q.defer();
  var promise  = deferred.promise;

  $http.get('/auth/isloggedin')
    .success(function (data, status) {
      if (status === 200) {
        deferred.resolve(data);
      }
      else {
        deferred.reject(data);
      }
    })
    .error(function (data) {
      deferred.reject(data);
    });

  return deferred.promise;
};


module.exports = navigatorController;


// EOF -------------------------------------------------------------------------
