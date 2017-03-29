'use strict';

(function () {

  angular
    .module('stcom')
    .controller('ContactsController', ContactsController);

  function ContactsController(LangService, NgMap, $compile, $scope,) {

    const vm = this;


    // NgMap.setStyle('border: 1px solid black');

    NgMap.getMap().then(function (map) {

      google.maps.event.addListener(map, 'zoom_changed', function (a, b) {
        console.log(map.zoom);
      });

      google.maps.event.addListener(map, 'bounds_changed', function (a, b) {
        console.log(a, b);
      });


      console.error(google);

    });


    _.assign(vm, {

      currentLang: LangService.getLang(),
      showToast,
      loaded: false,
      myFunc,
      afterMapInit,
      initialize,
      googleMap: {center: {latitude: 54.6936179, longitude: 25.2691563}, zoom: 15, id: 0},
      map: {
        ready: false,
        zoom: 12,
        center: [25.2691563, 54.6936179],
        marker: {
          id: 1,
          geometry: {
            type: 'Point',
            coordinates: [25.2691563, 54.6936179]
          },
          properties: {
            iconContent: 'UAB "SISTEMIUM"',
            hintContent: 'UAB "SISTEMIUM"'
          }
        }
      }
    });


    function afterMapInit() {
      vm.map.ready = true;
    }

    function showToast() {

    }

    function myFunc() {
      var html = '<div ng-click="selectedValue(vm.value)">ИНФА </div>',
        el = document.getElementById('re');

      vm.value = 'mk';

      angular.element(el).append($compile(html)($scope))
    }


    function initialize() {
      google.maps.close();
      vm.loaded = true;
      console.log(vm.loaded);
      // var map = new google.maps.Map(document.getElementById('map_div'), {
      //   center: {lat: -34.397, lng: 150.644},
      //   zoom: 8
      // });
    }

  }

})();
