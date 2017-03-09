'use strict';

(function () {

  angular
    .module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/domain/about/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
      });
  }

})();
