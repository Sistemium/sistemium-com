'use strict';

(function () {

  function RouterDecorator($rootScope, $state, localStorageService, $window) {


    $rootScope.$on('$stateChangeSuccess', (event, toState) => {

      var parentDefaultChild = _.get(toState,'parent.defaultChild');

      if (parentDefaultChild) {

        let mode = toState.name.match(/[^\.]*$/);

        if (mode) {
          localStorageService.set(toState.parent.name + '.mode', mode[0]);
        }
      }

      var title = _.get(toState, 'data.title');

      $window.document.title = title ? `Sistemium - ${title}` : 'Sistemium';

    });
  }

  angular.module('stcom')
    .run(RouterDecorator);

})();
