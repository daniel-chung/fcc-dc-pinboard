// /ng-app/components/pinshow/pinshow-controller.js
'use strict';

// Main
(function(angular) {
  angular.module('pca.pinshow', [
      'ngRoute'
    ])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/pinshow/:username', {
        templateUrl: 'ng-app/components/pinshow/pinshow-view.html',
        controller: 'pinshowCtrl',
        controllerAs: 'pinshowCtrl',
        access: {restricted: false}
      });
    }])

    .controller('pinshowCtrl', 
        ['$scope', '$http', '$location', '$routeParams',
      function($scope, $http, $location, $routeParams) {
        
        console.log('inside pinshowcontroller');
        console.log('inside pinshow param', $routeParams.username);

        // Get all pins on load
        $http.get('/api/pinshow/' + $routeParams.username)
          .then(function successCallback(response) {
            console.log("post success");
            //console.log(response.data);
            $scope.pcaPins = response.data;
          },
          function errorCallback(response) {
            console.log(response.status);
          });


        // Provide a controller for filtering
        $scope.filterUser = function(clickUserName) {
          console.log("filter user", clickUserName);
          $location.path('/pinshow/' + clickUserName);
        }

    }]);


})(window.angular);


// EOF -------------------------------------------------------------------------
