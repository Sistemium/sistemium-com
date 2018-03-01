'use strict';

(function () {

  angular.module('stcom')
    .component('pageLogin', {

      bindings: {},

      templateUrl: 'app/domain/login/login.html',
      controller: LoginController,
      controllerAs: 'vm'

    });

  function LoginController(phaService, $scope, saEtc, $mdToast, $translate, AuthService, $state) {

    const vm = this;

    _.assign(vm, {
      state: 'phone',
      submitClick,
      $onInit
    });

    if (AuthService.account()) {
      $state.go('profile');
    }

    /*
    Functions
     */

    function $onInit() {
    }

    function showToast(code, suffix = '') {

      let el = saEtc.getElementById('root-md-content');

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
          return afterLogin(res);
        })
        .catch(err => {
          console.warn(err);
          showToast('LOGINPAGE.errors.invalidSms');
        });

    }

    function afterLogin(auth) {
      AuthService.saveToken(auth.accessToken);
      return AuthService.init()
        .then(() => {
          $state.go('profile');
        });
    }

  }

})();
