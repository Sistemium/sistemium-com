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

    $translate(['PROFILE-PAGE.options.logoffConfirm', 'YES', 'NO'])
      .then(res => _.assign(vm.translations, res))
      .catch(_.noop);

    /*
    Functions
     */

    function $onInit() {
      vm.cgBusy = AuthService.checkAuth()
        .then(auth => {

          let roles = AuthService.roles();
          let account = AuthService.account();

          _.assign(vm, {
            account,
            roles,
            accessToken: auth.accessToken,
            rolesArray: _.map(roles, (value, code) => {
              return {code, value};
            })
          });

          vm.data = profileData(roles);

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
        }),

        apps: apps(org, roles)

      };

    }

    function apps(org, roles) {

      let res = [];

      if (roles.salesman || roles.supervisor) {

        res.push({
          url: `https://${jSistemiumUrl(org)}.sistemium.com`,
          code: 'jSistemium'
        });

        if (org === 'bs') {
          res.push({
            url: 'https://sistemium.com/bs/tp/',
            params: `?access-token=${vm.accessToken}`,
            code: 'iOrders'
          });
        }

      }

      if (roles.salesman || roles.supervisor || roles.driver) {
        res.push({
          code: 'iosProfile',
          url: `https://sistemium.com/${iosProfileUrl(org, roles)}`
        })
      }

      return res;

    }

    function iosProfileUrl(org, roles) {

      let suffix = roles.driver ? 'ios-drivers' : 'ios-setup';

      switch (org) {
        case 'r50p':
        case 'dr50':
        case 'r50': {
          return `r50/${suffix}`;
        }
        case 'bs':
        case 'dev': {
          return `bs/${suffix}`;
        }

      }

    }

    function jSistemiumUrl(org) {

      switch (org) {
        case 'dev':
        case 'dr50': {
          return 'isd';
        }
        case 'bs': {
          return 'jt';
        }
        case 'r50': {
          return 'i';
        }
        case 'r50p': {
          return 'ibi';
        }
      }

    }

    function logoffClick(ev) {

      let t = vm.translations;

      let confirm = $mdDialog.confirm()
        .title(t['PROFILE-PAGE.options.logoffConfirm'])
        .ariaLabel(t['PROFILE-PAGE.options.logoffConfirm'])
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
