// /app/public/ng-app/components/showpins/showpins-directive.js
'use strict';

module.exports = function () {
  return {
    restrict: 'E',
    templateUrl: 'ng-app/components/showpins/showpins.html',
    controller: 'pb.showpins.showpinsCtrl',
    controllerAs: 'showpinsCtrl',
    scope: {
      owners: '='
    }
  };
};


// EOF -------------------------------------------------------------------------
