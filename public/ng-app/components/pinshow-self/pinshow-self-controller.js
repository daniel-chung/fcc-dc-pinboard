// /ng-app/components/pinshow-self/pinshow-self-controller.js
'use strict';

// Main
(function(angular) {
  angular.module('pca.pinshowself', [
      'ngRoute'
    ])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/pinshowself', {
        templateUrl: 'ng-app/components/pinshow-self/pinshow-self-view.html',
        controller: 'pinshowselfCtrl',
        controllerAs: 'pinshowselfCtrl',
        access: {restricted: false}
      });
    }])

    .controller('pinshowselfCtrl', 
        ['$scope', '$http', '$location',
      function($scope, $http, $location) {

        console.log('inside pinshow self controller');

        // Get all pins on load
        $http.get('/api/pinshow/self')
          .then(function successCallback(response) {
            console.log("post success");
            $scope.pcaPins = response.data;
          },
          function errorCallback(response) {
            console.log(response.status);
          });

        // Provide a controller for filtering
        $scope.deletePin = function(clickPinId) {
          console.log("deleting pin:", clickPinId);

          $http.delete('/api/pindelete/' + clickPinId)
            .then(function successCallback(response) {
              console.log("delete success");
              $scope.pcaPins = response.data;
            },
            function errorCallback(response) {
              console.log(response.status);
            });
        };

    }]);


})(window.angular);


// EOF -------------------------------------------------------------------------
