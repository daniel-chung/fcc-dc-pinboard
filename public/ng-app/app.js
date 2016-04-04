// /app/app.js
'use strict';


// Main ------------------------------------------------------------------------

angular.module('pca', [
    'ngRoute',
    'pca.navigator',
    'pca.pinadd',
    'pca.pinshow'
  ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/pinshow/all'});
  }])

  // Provide authentication checks for ng-route
  .run(function ($rootScope, $location, $route, $http, $q) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      
      // Create a call back function to provide async functionality
      function routeChangeCb() {
        var deferred = $q.defer();
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
      }

      routeChangeCb().then(function(isLoggedIn) {
        console.log("next.access value: ", next.access, "isLoggedIn", isLoggedIn);
        
        // Redirect baed on authentication
        if (next.access.restricted && isLoggedIn === false) {
          $location.path('/');
          $route.reload();
        }
      })
      .catch(function () {
        console.log('error');
      });
  });
});



// EOF -------------------------------------------------------------------------
