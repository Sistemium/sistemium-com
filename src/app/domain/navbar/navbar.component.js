'use strict';

(function () {

  const rootNavbar = {
    templateUrl: 'app/domain/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'vm'
  };

  /** @ngInject */
  function NavbarController(StyleService, $translate, $state, localStorageService, LangService, $scope, moment) {

    const vm = this;

    _.assign(vm, {

      changeLanguage,
      changeStyle,
      openMenu,
      changeState,

      languages: [
        {label: 'English', key: 'en', class: 'flag-icon-gb'},
        {label: 'Русский', key: 'ru', class: 'flag-icon-ru'},
        {label: 'Lietuvių', key: 'lt', class: 'flag-icon-lt'}
      ],

      items: [
        {state: 'services'},
        {state: 'contacts'},
        {state: 'about'}
      ],

      currentState: null,
      lang: LangService.getLang(),
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

    $scope.$on('$stateChangeSuccess', (event, toState) => {
      vm.currentState = toState.name;
    });

    /*
     Functions
     */

    function changeState(item) {
      let toGo = _.get(item, 'state') || 'home';
      $state.go(_.toLower(toGo));
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
