'use strict';

(function () {

  angular.module('stcom')
    .component('pageContacts', {

      bindings: {},

      templateUrl: 'app/domain/contacts/contacts.html',
      controller: ContactsController,
      controllerAs: 'vm'

    });

  function ContactsController() {

    const vm = this;

    _.assign(vm, {
      eAddr: 'uab' + '@' + 'sistemium.com'
    });

  }

})();
