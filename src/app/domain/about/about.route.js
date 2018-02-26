'use strict';

(function () {

  angular.module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        template: '<page-about></page-about>'
      });
  }

})();
