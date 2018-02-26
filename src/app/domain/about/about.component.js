'use strict';

(function () {

  angular.module('stcom')
    .component('pageAbout', {

      bindings: {},

      templateUrl: 'app/domain/about/about.html',
      controller: AboutController,
      controllerAs: 'vm'

    });

  function AboutController() {

    const vm = this;
    _.assign(vm, {});

  }

})();
