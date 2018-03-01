'use strict';

(function () {

  angular.module('stcom')
    .service('ToastService', ToastService);

  function ToastService($mdToast, $translate, saEtc, $q) {

    return {
      error: showToast,
      success: showToast,
      warn: showToast,
      action: actionToast
    };

    function showToast(code, suffix = '', config = {}) {

      let el = saEtc.getElementById('root-md-content');

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

    function actionToast(messageCode, actionCode) {

      let el = saEtc.getElementById('root-md-content');

      return $q.all([$translate(messageCode), $translate(actionCode)])
        .catch(() => [messageCode, actionCode])
        .then(res => {

          let [message, action] = res;

          let toast = $mdToast.simple()
            .textContent(message)
            .action(action)
            .highlightAction(true)
            .position('top right')
            .hideDelay(0)
            .parent(el);

          return $mdToast.show(toast)
            .then(response => {
              return response === 'ok';
            });

        });
    }

  }

})
();
