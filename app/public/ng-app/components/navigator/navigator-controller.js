// /app/public/ng-app/components/navigator/navigator-controller.js
'use strict';

var navigatorController = function($http, $q) {

  // Model to keep track of logged in status
  this.loggedIn = false;
 
  // Call the call back
  this.authCallBack($q, $http).then(
    (function(isLoggedIn) {
      console.log("isLoggedIn", isLoggedIn);
      this.loggedIn = isLoggedIn;
    }).bind(this)
  )
  .catch(function () {
    console.log('authcall back error');
  });
  console.log('this.loggedIn', this.loggedIn);
}



// Authentication callback
navigatorController.prototype.authCallBack = function($q, $http) {
  
  var deferred = $q.defer();
  var promise  = deferred.promise;

  $http.get('/auth/isloggedin')
    .success(function (data, status) {
      console.log('success');
      if (status === 200) {
        deferred.resolve(data);
      }
      else {
        deferred.reject(data);
      }
      console.log('data', data);
    })
    .error(function (data) {
      console.log('http error');
      deferred.reject(data);
      console.log('data', data);
    });

  return deferred.promise;
};


module.exports = navigatorController;


// EOF -------------------------------------------------------------------------
