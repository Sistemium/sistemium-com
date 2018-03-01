'use strict';

(function () {

  angular
    .module('stcom')
    .config(config)
    .config($locationProvider => {
      $locationProvider.hashPrefix('');
    })
    .value('cgBusyDefaults', {
      message: 'BUSYLOADING',
      delay: 0,
      // minDuration: 5000,
      templateUrl: 'app/components/busy/busy.html'
    })
    .service('DEBUG', DEBUG);


  function config($logProvider, $mdThemingProvider, localStorageServiceProvider, $translateProvider) {

    $translateProvider.useStaticFilesLoader({
      files: [{
        prefix: 'app/translations/locale-',
        suffix: '.json'
      },{
        prefix: 'app/translations/services/',
        suffix: '.json'
      },{
        prefix: 'app/translations/about/',
        suffix: '.json'
      },{
        prefix: 'app/translations/contacts/',
        suffix: '.json'
      },{
        prefix: 'app/translations/profile/',
        suffix: '.json'
      }]
    });

    $translateProvider
      .preferredLanguage('ru')
      .fallbackLanguage(['ru', 'en', 'lt'])
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
