'use strict';

(function () {

  angular.module('stcom')
    .component('pageLogin', {

      bindings: {},

      templateUrl: 'app/domain/login/login.html',
      controller: LoginController,
      controllerAs: 'vm'

    });

  function LoginController(phaService, $scope, saEtc, $mdToast, $translate, localStorageService) {

    const vm = this;

    _.assign(vm, {
      state: 'phone',
      submitClick
    });

    // saEtc.focusElementById('login-phone-input', 500);

    /*
    Functions
     */

    function showToast(code, suffix = '') {

      let el = saEtc.getElementById('login');

      return $translate(code)
        .catch(() => code)
        .then(text => $mdToast.show(
          $mdToast.simple()
            .textContent(`${text}${suffix}`)
            .position('top right')
            .parent(el)
            .hideDelay(4000)
          ))
        .catch(_.noop);

    }

    function submitClick() {

      if ($scope.loginForm.$invalid) {
        console.warn('Invalid form');
        return;
      }

      let fn = vm.state === 'phone' ? submitPhone : submitSms;

      vm.busy = true;

      return fn()
        .finally(() => vm.busy = false);

    }

    function submitPhone() {

      let phone = `8${vm.phone}`;

      return phaService.auth(phone)
        .then(() => {
          vm.state = 'sms';
          saEtc.focusElementById('login-sms-input', 500);
          showToast('LOGINPAGE.messages.smsSent');
        })
        .catch(() => {
          showToast('LOGINPAGE.errors.unknownPhone');
        });

    }

    function submitSms() {

      let {sms} = vm;

      return phaService.confirm(sms)
        .then(res => {
          console.info('Auth success', res);
          vm.state = 'authorized';
          showToast('LOGINPAGE.messages.welcome', `, ${res.account.name}!`);
          return afterLogin(res);
        })
        .catch(() => {
          showToast('LOGINPAGE.errors.invalidSms');
        });

    }

    function afterLogin(auth) {
      localStorageService.set('authorization', auth.accessToken);
    }

  }

})();
