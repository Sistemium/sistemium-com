'use strict';

(function () {

  function AuthService(localStorageService, phaService, ToastService, $q) {

    function loadToken() {
      return localStorageService.get('authorization');
    }

    function saveToken(token) {
      return localStorageService.set('authorization', token);
    }

    function deleteToken() {
      return localStorageService.remove('authorization');
    }

    function checkAuth() {

      let token = loadToken();

      return phaService.getRoles(token)
        .then(res => {
          console.warn('Authorized', res);
          return res;
        });

    }

    function init() {

      if (!loadToken()) {
        return $q.reject('Not authorized yet');
      }

      return checkAuth()
        .then(auth => {
          ToastService.success('LOGINPAGE.messages.welcome', `, ${auth.account.name}!`);
        })
        .catch(err => {

          let status = err.status || err;

          if (status === 401 || status === 403) {
            console.warn('Not authorized though logging off');
            deleteToken();
          }

        });

    }

    return {
      init,
      saveToken
    };

  }

  angular.module('stcom')
    .service('AuthService', AuthService);

})();
