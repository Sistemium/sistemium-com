(function () {

  angular.module('stcom')
    .component('rootFooter', {

      bindings: {},
      templateUrl: 'app/domain/rootFooter/rootFooter.html',

      controller: FooterController,
      controllerAs: 'vm'

    });

  function FooterController(moment) {

    _.assign(this, {
      today: moment()
    });

  }


})();
