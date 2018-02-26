'use strict';

(function () {

  angular.module('stcom')
    .component('pageHome', {

      bindings: {},

      templateUrl: '/app/domain/home/home.html',
      controller: HomeController,
      controllerAs: 'vm'

    });

  function HomeController() {

    const vm = this;

    _.assign(vm, {

    });

  }

})();
