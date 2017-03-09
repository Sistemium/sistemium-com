'use strict';

(function () {

  angular
    .module('stcom')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'app/domain/contacts/contacts.html',
        controller: 'ContactsController',
        controllerAs: 'vm'
      });
  }

})();
