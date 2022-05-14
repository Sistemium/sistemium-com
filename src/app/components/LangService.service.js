'use strict';

(function () {

  function LangService($translate) {

    function getLang() {
      console.log($translate.resolveClientLocale());
      return $translate.proposedLanguage();
    }

    function availableLanguages() {
      return ['lt', 'ru', 'en'];
    }

    return {
      getLang,
      availableLanguages
    };

  }

  angular.module('sistemium.services')
    .service('LangService', LangService);

})();
