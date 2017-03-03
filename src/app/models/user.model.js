'use strict';

(function () {

  angular
    .module('sistemium.models')
    .run(User);

  function User(Schema) {

    const validSymbols = '\\dA-z\\-\\._$';

    return Schema.register({

      name: 'User',

      relations: {
        hasMany: {
        }
      },

      meta: {
        emailPattern: new RegExp(`[${validSymbols}]+@[${validSymbols}]+\\.[A-z]{2,}$`)
      }

    });

  }

}());
