'use strict';

(function () {

  angular.module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('contacts', {
        url: '/contacts',
        template: '<page-contacts></page-contacts>'
      });
  }

})();
