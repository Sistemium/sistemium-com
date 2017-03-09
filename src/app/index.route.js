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
        templateUrl: 'app/domain/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('home');
  }

})();
