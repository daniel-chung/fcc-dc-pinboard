// /app/public/ng-app/components/footer/index.js
'use strict';

var footerDirective  = require('./footer-directive');
var footerController = require('./footer-controller');


module.exports = angular
  .module('pb.footer', [])
  .directive('pbFooter', footerDirective)
  .controller('pb.footer.footerCtrl', footerController);


// EOF -------------------------------------------------------------------------
