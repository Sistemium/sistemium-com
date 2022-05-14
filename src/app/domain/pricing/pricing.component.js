'use strict';

(function () {

  angular.module('stcom')
    .component('pagePricing', {

      bindings: {},

      templateUrl: 'app/domain/pricing/pricing.html',
      controller: PricingController,
      controllerAs: 'vm'

    });

  function PricingController() {

    const vm = this;

    _.assign(vm, {
    });

  }

})();
