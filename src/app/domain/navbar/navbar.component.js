'use strict';

(function () {

  const rootNavbar = {
    templateUrl: 'app/domain/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'vm'
  };

  /** @ngInject */
  function NavbarController(StyleService, $translate, $state, localStorageService) {

    const vm = this;

    _.assign(vm, {

      changeLanguage,
      changeStyle,
      openMenu,
      changeState,

      languages: [
        {label: 'English (US)', key: 'us'},
        {label: 'Русский', key: 'ru'},
        {label: 'Lietuvių', key: 'lt'}
      ],

      items: [
        {state: 'services'},
        {state: 'contacts'},
        {state: 'about'}
      ],

      lang: localStorageService.get('lang') || 'us',
      style: StyleService.getStyle(),
      availableStyles: StyleService.availableStyles()

    });

    vm.items = _.map(vm.items, item => _.assign(item, {
      translate: _.toUpper(item.state)
    }));

    $scope.$watch('vm.lang', (nv, ov) => {
      if (nv !== ov) {
        moment.locale(nv);
        $state.go($state.current, {}, {reload: true});
      }
    });

    /*
     Functions
     */

    function changeState(item) {
      $state.go(item.state);
    }

    function changeLanguage(lang) {

      localStorageService.set('lang', lang.key);
      $translate.use(vm.lang = lang.key);

    }

    function openMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }

    function changeStyle(style) {
      vm.style = style;
      StyleService.setStyle(style);
    }

  }

  angular.module('stcom')
    .component('rootNavbar', rootNavbar);


})();
