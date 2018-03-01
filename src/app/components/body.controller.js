'use strict';

(function () {

  function BodyController(saUserAgent, StyleService, appcache, $window, ToastService, $timeout) {

    const vm = this;

    _.assign(vm, {

      os: saUserAgent.os,
      cls: saUserAgent.cls,
      currentStyle: () => StyleService.getStyle()

    });

    vm.cacheStatus = function () {
      return appcache.textStatus;
    };

    function onUpdate() {
      ToastService.action('APP-GOT-UPDATE', 'APPLY')
        .then(() => $window.location.reload(true))
        .catch(() => {
          $timeout(1000).then(onUpdate);
        });
    }

    $window.stmAppCacheUpdated = onUpdate;

    appcache.addEventListener('updateready', onUpdate, true);

    $window.toast = ToastService;

  }

  angular.module('sistemium.services')
    .controller('BodyController', BodyController);

})();
