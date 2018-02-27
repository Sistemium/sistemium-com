'use strict';

(function () {

  function AuthService(localStorageService, phaService, ToastService, $q) {

    let authCached = false;

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

      return phaService.getRoles(token);

    }

    function init() {

      if (!loadToken()) {
        return $q.reject('Not authorized yet');
      }

      return checkAuth()
        .then(auth => {
          console.info('Authorized', auth);
          authCached = auth;
          ToastService.success('LOGINPAGE.messages.welcome', `, ${auth.account.name}!`, {timeout: 1000});
          return auth;
        })
        .catch(err => {

          let status = err.status || err;

          if (status === 401 || status === 403) {
            console.warn('Not authorized though logging off');
            deleteToken();
          }

          return $q.reject('Not authorized')

        });

    }

    function roles() {
      return authCached && authCached.roles;
    }

    function account() {
      return authCached && authCached.account;
    }

    function isAuthorized(role) {
      let allRoles = roles();
      return allRoles && (!role || allRoles[role]);
    }

    return {
      checkAuth,
      init,
      saveToken,
      roles,
      account,
      isAuthorized
    };

  }

  angular.module('stcom')
    .service('AuthService', AuthService);

})();
