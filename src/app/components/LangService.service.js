'use strict';

(function () {

  function LangService(localStorageService) {

    function getLang() {
      return localStorageService.get('lang') || 'ru';
    }

    function availableLanguages() {
      return ['ru', 'en', 'lt']
    }

    return {
      getLang,
      availableLanguages
    };

  }

  angular.module('sistemium.services')
    .service('LangService', LangService);

})();
