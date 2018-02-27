'use strict';

(function () {

  angular.module('stcom')
    .component('pageProfile', {

      templateUrl: 'app/domain/profile/profile.html',
      controller: ProfileController,
      controllerAs: 'vm'

    });

  /** @ngInject */
  function ProfileController(AuthService) {

    const vm = this;

    AuthService.checkAuth()
      .then(() =>{
        _.assign(vm, {
          account: AuthService.account(),
          roles: _.map(AuthService.roles(), (value, code) => {
            return {code, value};
          })
        });
      });

  }

})();
