'use strict';

(function () {

  const rootNavbar = {
    templateUrl: 'app/domain/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'vm'
  };

  /** @ngInject */
  function NavbarController($scope, $window) {

    const vm = this;

    _.assign(vm, {

    });

    $scope.$on('logged-off', function () {
      $window.location.href = '';
    });

    /*
    Functions
     */

  }

  angular.module('stcom')
    .component('rootNavbar', rootNavbar);


})();
