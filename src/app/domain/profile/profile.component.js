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
      $onInit,
      translations: {}
    });

    $translate(['PROFILEPAGE.options.logoffConfirm', 'YES', 'NO'])
      .then(res => _.assign(vm.translations, res))
      .catch(_.noop);

    /*
    Functions
     */

    function $onInit() {
      vm.cgBusy = AuthService.checkAuth()
        .then(() => {

          _.assign(vm, {
            account: AuthService.account(),
            roles: _.map(AuthService.roles(), (value, code) => {
              return {code, value};
            })
          });

          vm.data = profileData(AuthService.roles());

        });
    }

    function orgName(org) {
      switch (org) {
        case 'bs':
        case 'dev': {
          return 'ДжейТи-Логистик';
        }
        case 'r50':
        case 'dr50': {
          return 'Регион-50';
        }
        case 'r50p': {
          return 'Ибис';
        }
      }

    }

    const knownRoles = ['admin', 'supervisor', 'salesman', 'driver', 'accountant', 'logist'];

    function mainRole(roles) {
      return _.find(knownRoles, role => roles[role]);
    }

    function profileData(roles) {

      let {org} = vm.account;

      return {

        orgName: orgName(org),
        mainRole: mainRole(roles),

        roles: _.map(roles, (val, code) => {
          return _.find(knownRoles, code);
        })

      };

    }

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
