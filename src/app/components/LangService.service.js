'use strict';

(function () {

  function LangService($translate) {

    function getLang() {
      return $translate.proposedLanguage();
    }

    function availableLanguages() {
      return ['lt', 'en'];
    }

    return {
      getLang,
      availableLanguages
    };

  }

  angular.module('sistemium.services')
    .service('LangService', LangService);

})();
