'use strict';

(function () {

  angular
    .module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('services', {
        url: '/services',
        template: '<page-services></page-services>'
      });
  }

})();
