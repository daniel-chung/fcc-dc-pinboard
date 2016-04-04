// /ng-app/components/navigator/navigator-directive.js

// Main
(function(angular) {
  angular
    .module('pca.navigator', [])
    .directive('pcaNavigator', function() {
      return {
        //template: '<div>Testing nav</div>'
        templateUrl: 'ng-app/components/navigator/navigator-view.html'
      };
    });

})(window.angular);


// EOF -------------------------------------------------------------------------
