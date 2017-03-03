'use strict';

(function () {

  function BodyController (saUserAgent) {

    const vm = this;

    _.assign(vm, {

      os: saUserAgent.os,
      cls: saUserAgent.cls

    });

  }

  angular.module('sistemium.services')
    .controller('BodyController', BodyController);

})();
