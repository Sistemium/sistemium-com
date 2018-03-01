'use strict';

(function () {

  function AuthService(localStorageService, phaService, ToastService, $q) {

    let authCached = false;
    let busy;

    return {
      checkAuth,
      init,
      saveToken,
      roles,
      account,
      isAuthorized,
      logoff
    };

    /*
    Functions
     */

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

      if (!token) {
        return $q.reject('Not authorized yet');
      }

      if (busy) {
        return busy;
      }

      busy =  phaService.getRoles(token)
        .then(auth => {
          console.info('Authorized', auth);
          authCached = auth;
          return auth;
        })
        .catch(() => busy = false);

      return busy;

    }

    function init() {

      return (busy || checkAuth())
        .then(auth => {
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

    function logoff() {
      // let {accessToken} = authCached || {};
      // return accessToken ? phaService.logoff(accessToken) : $q.resolve();
      deleteToken();
      return $q.resolve();
    }

  }

  angular.module('stcom')
    .service('AuthService', AuthService);

})();
