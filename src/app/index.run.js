'use strict';

(function () {

  angular
    .module('stcom')
    .run(runBlock)
    .run(makeMeasureDigest)
    .run(function (amMoment, LangService) {

      let localeLanguage = LangService.getLang();
      amMoment.changeLocale(localeLanguage);
      // if (!localStorageService.get('lang'))
      //   localStorageService.set('lang', 'ru');

    });

  /** @ngInject */

  function runBlock(AuthService, routerAuth) {

    routerAuth.init(AuthService.init());

    // $log.debug('runBlock end');

  }

  function makeMeasureDigest($window) {
    $window.measureDigest = () =>
      angular.element($window.document.querySelector('[ng-app]'))
        .injector()
        .invoke(function ($rootScope) {
          let a = performance.now();
          $rootScope.$apply();
          console.log('Digest length:', Math.round(performance.now() - a));
        });
  }

})();
