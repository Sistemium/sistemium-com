'use strict';

(function () {

  angular.module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<page-login></page-login>'
      });
  }

})();
