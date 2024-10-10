'use strict';

(function () {

  angular
    .module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        template: '<page-products></page-products>'
      });
  }

})();
