'use strict';

(function () {

  angular.module('stcom')
    .component('pageServices', {

      bindings: {},
      templateUrl: 'app/domain/services/services.html',
      controller: ServicesController,
      controllerAs: 'vm'

    });

  function ServicesController() {

    const vm = this;

    _.assign(vm, {});

  }

})();
