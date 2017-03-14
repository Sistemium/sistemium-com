'use strict';

(function () {

  angular
    .module('stcom')
    .controller('ServicesController', ServicesController);

  function ServicesController(moment) {

    const vm = this;
    _.assign(vm, {

      time: moment().get(),
      today: moment().calendar()

    });

  }

})();
