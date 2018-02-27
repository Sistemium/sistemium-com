'use strict';

(function () {

  angular.module('stcom')
    .service('ToastService', ToastService);

  function ToastService($mdToast, $translate, saEtc) {

    return {
      error: showToast,
      success: showToast,
      warn: showToast
    };

    function showToast(code, suffix = '', config = {}) {

      let el = saEtc.getElementById('root-viewport');

      return $translate(code)
        .catch(() => code)
        .then(text => $mdToast.show(
          $mdToast.simple()
            .textContent(`${text}${suffix}`)
            .position('top right')
            .parent(el)
            .hideDelay(config.timeout || 4000)
        ))
        .catch(_.noop);

    }

  }

})();
