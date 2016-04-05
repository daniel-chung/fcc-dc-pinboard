// /ng-app/components/navigator/navigator-directive.js

// Main
(function(angular) {
  angular.module('pca.navigator', [])
    
    .controller('pcaNavigatorCtrl', [
      '$http',
      '$scope',
      '$q',
      function($http, $scope, $q) {

        console.log("inside navigator directive controller");
        
        $scope.test = "hello";
        $scope.loggedIn = false;

        function authCallBack () {
          var deferred = $q.defer();
          var promise = deferred.promise;

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

        // Call the call back
        authCallBack().then(function(isLoggedIn) {
          console.log("isLoggedIn", isLoggedIn);
	        $scope.loggedIn = isLoggedIn;          
        })
        .catch(function () {
          console.log('error');
        });


        console.log("exiting navigator directive controller");

    }])
    
    .directive('pcaNavigator', function() {
      return {
        templateUrl: 'ng-app/components/navigator/navigator-view.html'
      };
    });

})(window.angular);


// EOF -------------------------------------------------------------------------
