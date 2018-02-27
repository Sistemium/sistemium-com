'use strict';

(function () {

  function routerAuth ($rootScope, AuthService, $state) {

    let authState = {
      busy: true,
      authorized: false
    };

    function init (authPromise) {

      authPromise
        .then(() => _.assign(authState, {busy: false, authorized: true}))
        .catch(() => _.assign(authState, {busy: false, authorized: false}));

      $rootScope.$on('$stateChangeStart', function (event, next, nextParams) {

        let needRoles = _.get(next, 'data.needRoles');

        if (needRoles && authState.busy) {
          return authPromise
            .catch(() => {
              event.preventDefault();
              $state.go('login');
            });
        }

        if (needRoles && !AuthService.isAuthorized(needRoles)) {
          event.preventDefault();
          console.error('routerAuth:', next, nextParams, needRoles);
          $state.go('login');
        }

      });

    }

    return {
      init
    };

  }

  angular.module('stcom')
    .service('routerAuth', routerAuth);

})();
