'use strict';

(function () {

  angular.module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('pricing', {
        url: '/pricing',
        template: '<page-pricing></page-pricing>'
      });
  }

})();
