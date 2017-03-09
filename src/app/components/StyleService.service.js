'use strict';

(function () {

  function StyleService(localStorageService) {

    let currentStyle = localStorageService.get('style') || 'dark';

    function getStyle() {
      return currentStyle;
    }

    function setStyle(newStyle) {
      localStorageService.set('style', newStyle);
      currentStyle = newStyle;
    }

    function availableStyles() {
      return ['main', 'origin', 'dark', 'minimalistic'];
    }

    return {
      getStyle,
      setStyle,
      availableStyles
    };

  }

  angular.module('sistemium.services')
    .service('StyleService', StyleService);

})();
