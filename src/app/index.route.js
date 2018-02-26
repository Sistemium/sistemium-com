'use strict';

(function () {

  angular
    .module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        template: '<page-home></page-home>'
      });

    $urlRouterProvider.otherwise('home');
  }

})();
