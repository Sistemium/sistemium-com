'use strict';

(function () {

  angular.module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        template: '<page-profile></page-profile>',
        data: {
          needRoles: 'authenticated'
        }
      });
  }

})();
