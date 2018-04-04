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
        case 'qcm': {
          return 'КвадроКом';
        }
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

    const knownRoles = [
      'admin',
      'supervisor', 'salesman',
      'accountant',
      'logist', 'driver',
      'warehouse', 'picker',
      'outlet'
    ];

    function mainRole(roles) {
      return _.find(knownRoles, role => roles[role]);
    }

    function profileData(roles) {

      let {org} = vm.account;

      return {

        isTestEnvironment: isTestEnvironment(org),
        orgName: orgName(org),
        mainRole: mainRole(roles),

        roles: _.filter(_.map(roles, (val, code) => {
          return _.find(knownRoles, role => role === code) ? {code} : false;
        })),

        apps: apps(org, roles)

      };

    }

    function checkAppAuthorization(key) {
      return $window.localStorage.getItem(key);
    }

    function apps(org, roles) {

      let res = [];

      if (roles.salesman || roles.supervisor || roles.outlet) {

        res.push({
          url: `https://${jSistemiumUrl(org)}.sistemium.com`,
          code: 'jSistemium',
          params: `/#/auth?access-token=${vm.accessToken}`
        });

        if (org === 'bs') {

          let app = {
            url: 'https://sistemium.com/bs/tp/',
            code: 'iOrders',
            authorized: checkAppAuthorization(`${org}.accessToken`)
          };

          if (!app.authorized) {
            app.params = `?access-token=${vm.accessToken}`;
          }

          res.push(app);

        }

      }

      if (roles.warehouse || roles.supervisor || roles.logist || roles.stg) {
        res.push({
          code: 'stg',
          url: `https://stg.sistemium.com`,
          params: `/#/?access-token=${vm.accessToken}`
        })
      }

      let profileUrl = iosProfileUrl(org, roles);

      if (profileUrl) {
        res.push({
          code: 'iosProfile',
          url: `https://sistemium.com/${profileUrl}`
        })
      }

      return res;

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
          return 'sales';
        }
        case 'r50p': {
          return 'ibi';
        }
      }

    }

    function isTestEnvironment(org) {
      return /dev|dr50/.test(org);
    }

    function iosProfileUrl(org, roles) {

      if (org === 'dev') {
        org = 'bs';
      } else if (org === 'dr50') {
        org = 'r50';
      }

      let mainRoles = ['salesman', 'supervisor', 'driver'];

      let mainRole = _.find(mainRoles, role => roles[role]);

      switch (`${org}/${mainRole}`) {
        case 'r50/driver': {
          return 'p15.drivers.mobileconfig';

        }
        case 'r50/salesman':
        case 'r50/supervisor': {
          return 'p15.mobileconfig';
        }
        case 'bs/driver': {
          return 'bs/drivers-JT.mobileconfig';

        }
        case 'bs/salesman':
        case 'bs/supervisor': {
          return 'bs/Sistemium-JT.mobileconfig';
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
