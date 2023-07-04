'use strict';

(function () {

  angular.module('stcom')
    .component('rootNavbar', {

      templateUrl: 'app/domain/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm'

    });

  /** @ngInject */
  function NavbarController(StyleService, $translate, $state,
                            localStorageService, LangService, $scope, moment,
                            AuthService) {

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
        {state: 'pricing'},
        {state: 'about'}
        // {state: 'login', icon: 'vpn_key'}
      ],

      currentState: null,
      lang: LangService.getLang(),
      style: StyleService.getStyle(),
      availableStyles: StyleService.availableStyles()

    });

    vm.items = _.map(vm.items, item => _.assign(item, {
      translate: _.toUpper(item.state)
    }));

    onStateChange(null, $state.current);

    $scope.$watch('vm.lang', (nv, ov) => {
      if (nv !== ov) {
        moment.locale(nv);
        $state.go($state.current, {}, {reload: true});
      }
    });

    $scope.$on('$stateChangeSuccess', onStateChange);

    $scope.$watch(() => AuthService.isAuthorized(), onAuth);

    /*
     Functions
     */

    function onAuth(res) {

      if (res && !vm.isAuthorized) {
        _.remove(vm.items, {state: 'login'});
        let state = 'profile';
        vm.items.push({state, icon: 'account_circle', translate: _.upperCase(state)});
      }

      vm.isAuthorized = !!res;

    }

    function onStateChange(event, toState) {
      vm.currentState = toState.name;
    }

    function changeState(item) {
      let toGo = _.get(item, 'state') || 'home';
      $state.go(_.toLower(toGo));
    }

    function changeLanguage(lang) {
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

})();
