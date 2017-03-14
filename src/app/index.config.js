'use strict';

(function () {

  angular
    .module('stcom')
    .config(config)
    .config($locationProvider => {
      $locationProvider.hashPrefix('');
    })
    .service('DEBUG', DEBUG);


  function config($logProvider, $mdThemingProvider, localStorageServiceProvider, $translateProvider) {

    $translateProvider.useStaticFilesLoader({
      prefix: 'app/translations/locale-',
      suffix: '.json'
    });

    $translateProvider
      .preferredLanguage('en')
      .fallbackLanguage(['en', 'lt', 'ru'])
      .useLocalStorage()
      .useSanitizeValueStrategy('escape');


    // Enable log
    $logProvider.debugEnabled(true);

    // define themes for material
    $mdThemingProvider.theme('success-toast');
    $mdThemingProvider.theme('fail-toast');

    localStorageServiceProvider
      .setPrefix('st');
  }


  function DEBUG(saDebug) {
    return saDebug.log('stm:st');
  }

})();
