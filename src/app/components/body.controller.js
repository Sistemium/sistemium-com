'use strict';

(function () {

  function BodyController(saUserAgent, StyleService) {

    const vm = this;

    _.assign(vm, {

      os: saUserAgent.os,
      cls: saUserAgent.cls,
      currentStyle: () => StyleService.getStyle()

    });

  }

  angular.module('sistemium.services')
    .controller('BodyController', BodyController);

})();
