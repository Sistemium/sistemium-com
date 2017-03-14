'use strict';

(function () {

  angular
    .module('stcom')
    .config(config)
    .config($locationProvider => {
      $locationProvider.hashPrefix('');
    })
    .service('DEBUG', DEBUG);



    };

    $translateProvider
      .translations('en', translationsEN)
      .translations('lt', translationsLT)
      .translations('ru', translationsRU)
      .preferredLanguage('en')
      .fallbackLanguage('en')
      .useLocalStorage();

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
