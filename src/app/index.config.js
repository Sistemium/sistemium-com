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
      }, {
        prefix: 'app/translations/products/',
        suffix: '.json'
      },{
        prefix: 'app/translations/services/',
        suffix: '.json'
      }, {
        prefix: 'app/translations/pricing/',
        suffix: '.json'
      }, {
        prefix: 'app/translations/about/',
        suffix: '.json'
      }, {
        prefix: 'app/translations/contacts/',
        suffix: '.json'
      }, {
        prefix: 'app/translations/profile/',
        suffix: '.json'
      }, {
        prefix: 'app/translations/login/',
        suffix: '.json'
      }]
    });

    const locale = $translateProvider.resolveClientLocale() || 'lt';
    const localeLang = locale.substring(0, 2);
    const LANGS = ['en', 'lt'];
    const clientLang = _.find(LANGS, l => l === localeLang);

    $translateProvider
      .preferredLanguage(clientLang)
      .fallbackLanguage(LANGS)
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
