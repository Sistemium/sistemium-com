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
        templateUrl: 'app/domain/services/services.html',
        controller: 'ServicesController',
        controllerAs: 'vm'
      });
  }

})();
