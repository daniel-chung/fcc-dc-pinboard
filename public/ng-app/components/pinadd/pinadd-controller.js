// /ng-app/components/pinadd/pinadd-controller.js
'use strict';

// Main
(function(angular) {
  angular
    .module('pca.pinadd', [
      'ngRoute'
    ])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/pinadd', {
        templateUrl: 'ng-app/components/pinadd/pinadd-view.html',
        controller: 'pinaddCtrl',
        controllerAs: 'pinaddCtrl',
        access: {restricted: true}
      });
    }])

    .controller('pinaddCtrl', 
        ['$scope', '$http', '$location',
      function($scope, $http, $location) {

        // Define services
        $scope.pinadd = function() {
          $http
            .post('/api/pinadd', $scope.pinaddForm)
            .then(
                function successCallback(response) {
                  console.log("post success");
                  $scope.pinaddForm.pinname = '';
                  $scope.pinaddForm.url     = '';
                },
                function errorCallback(response) {
                  console.log(response.status);
                }
            );

        }

      }]);
})(window.angular);


// EOF -------------------------------------------------------------------------
