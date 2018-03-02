'use strict';

(function () {

  angular.module('stcom')
    .service('phaService', phaService);

  function phaService($http, $rootScope, $q) {

    const url = 'https://api.sistemium.com/pha/auth';
    const logoffUrl = 'https://api.sistemium.com/pha/logoff';
    const rolesUrl = 'https://api.sistemium.com/pha/roles';

    const me = this;

    let ID;

    return angular.extend(me, {
      auth,
      logoff,
      confirm,
      getRoles
    });

    function auth(mobileNumber) {
      return $http
        .post(url, null, {params: {mobileNumber: mobileNumber}})
        .then(res => {
          if (res.data && res.data.ID) {
            ID = res.data.ID;
          }
        });
    }

    function logoff(token) {
      return $http
        .get(logoffUrl, {
          headers: {
            'Authorization': token
          },
          timeout: 4000
        });
    }

    function confirm(code) {

      return $http.post(url, null, {params: {ID: ID, smsCode: code}})
        .then(res => {
          return getRoles(res.data.accessToken);
        });

    }

    function getRoles(token) {

      if (!token) {
        return $q.reject(401);
      }

      return $http.get(rolesUrl, {
        headers: {
          Authorization: token
        },
        timeout: 15000
      })
        .then(httpResponse => {

          let res = httpResponse.data;

          let response = {
            accessToken: token,
            roles: res.roles,
            account: res.account
          };

          me.roles = res.roles;
          me.account = res.account;

          $rootScope.$broadcast('authenticated', response);

          return response;

        });

    }

  }

})();
