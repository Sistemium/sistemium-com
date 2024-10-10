'use strict';

(function () {

  angular.module('stcom')
    .component('pageProducts', {

      bindings: {},
      templateUrl: 'app/domain/products/products.html',
      controller: ProductsController,
      controllerAs: 'vm'

    });

  function ProductsController() {

    const vm = this;

    _.assign(vm, {});

  }

})();
