'use strict';

(function () {


  angular
    .module('stcom')
    .run(runBlock)
    .run(makeMeasureDigest)
    .run(function(amMoment) {
      // TODO: need dependency on current language
      amMoment.changeLocale('ru');
    });

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');

  }

  function makeMeasureDigest($window) {
    $window.measureDigest = () =>
      angular.element($window.document.querySelector('[ng-app]'))
        .injector()
        .invoke(function ($rootScope) {
          var a = performance.now();
          $rootScope.$apply();
          console.log('Digest length:', Math.round(performance.now() - a));
        });
  }

})();
