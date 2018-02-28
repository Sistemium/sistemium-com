'use strict';

(function () {

  angular.module('stcom')
    .component('pageProfile', {

      templateUrl: 'app/domain/profile/profile.html',
      controller: ProfileController,
      controllerAs: 'vm'

    });

  /** @ngInject */
  function ProfileController(AuthService, $window, $mdDialog, $translate, $state) {

    const vm = this;

    _.assign(vm, {
      logoffClick,
      translations: {}
    });

    AuthService.checkAuth()
      .then(() => {
        _.assign(vm, {
          account: AuthService.account(),
          roles: _.map(AuthService.roles(), (value, code) => {
            return {code, value};
          })
        });
      });

    $translate(['PROFILEPAGE.options.logoffConfirm', 'YES', 'NO'])
      .then(res => _.assign(vm.translations, res))
      .catch(_.noop);

    /*
    Functions
     */

    function logoffClick(ev) {

      let t = vm.translations;

      let confirm = $mdDialog.confirm()
        .title(t['PROFILEPAGE.options.logoffConfirm'])
        .ariaLabel(t['PROFILEPAGE.options.logoffConfirm'])
        .targetEvent(ev)
        .ok(t['YES'])
        .cancel(t['NO']);

      $mdDialog.show(confirm)
        .then(logoff)
        .catch(_.noop);

    }

    function logoff() {
      AuthService.logoff()
        .then(() => {
          $state.go('home')
            .then(() => {
              $window.location.replace('');
            })
        });
    }

  }

})();
