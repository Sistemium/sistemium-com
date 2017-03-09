'use strict';

(function () {

  angular
    .module('stcom')
    .config(config)
    .service('DEBUG', DEBUG);

  function config($logProvider, $mdThemingProvider, localStorageServiceProvider, $translateProvider) {

    let translationsEN = {

      STYLES: {
        minimalistic: 'Minimalistic',
        origin: 'Origin',
        dark: 'Dark',
        main: 'Main'
      },

      SERVICES: 'Services',
      CONTACTS: 'Contacts',
      ABOUT: 'About',
      CONTACTSPAGE: {
        INFO: 'Vilnius, Kareiviu st. 19 \n' +
        'Work time: \n' +
        'I-V 10:00-19:00 \n' +
        'VI 10:00-16:00 \n' +
        'VII – Day Off \n' +
        'Telephone: 8-5-2763881 \n' +
        'E-mail: info@fotohobis.lt \n'
      },
      ABOUTPAGE: {
        PAGETEXT: 'The company’s offerings include home appliances such as TVs, monitors, printers, refrigerators, and washing machines as well as key mobile telecommunications products like smartphones and tablets. Samsung also continues to be a trusted provider of key electronic components like DRAM and non-memory semiconductors.' +
        'Samsung pledges to create and deliver quality products and services that enhance convenience and foster smarter lifestyles for its customers around the world. Samsung is dedicated to improving the global community through its constant pursuit of groundbreaking innovations and value creation.'
      },
      SERVICEPAGE: {
        PAGETEXT: `This is service page`
      }
    };

    let translationsLT = {

      STYLES: {
        minimalistic: 'Minimalistinis',
        origin: 'Šaltinis',
        dark: 'Tamsus',
        main: 'Pagrindinis'
      },

      SERVICES: 'Paslaugos',
      CONTACTS: 'Kontaktai',
      ABOUT: 'Apie',
      CONTACTSPAGE: {
        INFO: 'Vilnius, Kareivių g. 19 \n' +
        'Darbo laikas: \n' +
        'I-V 10:00-19:00 \n' +
        'VI 10:00-16:00 \n' +
        'VII – Nedirbame \n' +
        'Telefonas: 8-5-2763881 \n' +
        'El.paštas: info@fotohobis.lt \n'
      },
      ABOUTPAGE: {
        PAGETEXT: 'Įmonė siūlo buities prietaisus, pvz., televizorius, monitorius, spausdintuvus, šaldytuvus ir skalbykles, taip pat pagrindinius mobiliųjų telekomunikacijų produktus, pvz., išmaniuosius telefonus ir planšetinius kompiuterius. Be to, „Samsung“ yra patikima pagrindinių elektroninių komponentų, pvz., DRAM neatmintinių puslaidininkių, tiekėja.' +
        'Įmonė siūlo buities prietaisus, pvz., televizorius, monitorius, spausdintuvus, šaldytuvus ir skalbykles, taip pat pagrindinius mobiliųjų telekomunikacijų produktus, pvz., išmaniuosius telefonus ir planšetinius kompiuterius. Be to, „Samsung“ yra patikima pagrindinių elektroninių komponentų, pvz., DRAM neatmintinių puslaidininkių, tiekėja.'
      },
      SERVICEPAGE: {
        PAGETEXT: `Paslaugų puslapis`
      }
    };

    let translationsRU = {

      STYLES: {
        minimalistic: 'Минимализм',
        origin: 'Исток',
        dark: 'Темный',
        main: 'Главный'
      },

      SERVICES: 'Услуги',
      CONTACTS: 'Контакты',
      ABOUT: 'О компании',
      CONTACTSPAGE: {
        INFO: `Вильнюс, Карейвю у. 19 
          Время работы: 
          I-V 10:00-19:00 
          VI 10:00-16:00 
          VII – Не работаем 
          Телефон: 8-5-2763881
          Эл. Почта: info@fotohobis.lt`
      },
      ABOUTPAGE: {
        PAGETEXT: 'Компания предлагает бытовую технику и компьютерные устройства для дома, в том числе телевизоры, мониторы, принтеры, холодильники и стиральные машины, а также основные средства для мобильной связи: смартфоны, планшетные ПК и тому подобное. Компания Samsung неизменно пользуется доверием рынка как производитель важнейших электронных компонентов, таких как память DRAM и другие полупроводниковые устройства.' +
        'Samsung неизменно верна идее предоставления только качественных продуктов и услуг, которым потребители всего мира могут полностью доверять и которые помогают воплотить образ жизни будущего — жизни в мире, наполненном интеллектуальными устройствами. Samsung вносит посильный вклад в повышение уровня жизни мирового сообщества неизменным новаторством и созданием ценности.'
      },
      SERVICEPAGE: {
        PAGETEXT: `Страница услуг`
      }

    };

    $translateProvider
      .translations('en', translationsEN)
      .translations('lt', translationsLT)
      .translations('ru', translationsRU)
      .preferredLanguage('en')
      .fallbackLanguage('en')
      .useLocalStorage();

    // Enable log
    $logProvider.debugEnabled(true);

    // define themes for material
    $mdThemingProvider.theme('success-toast');
    $mdThemingProvider.theme('fail-toast');

    localStorageServiceProvider
      .setPrefix('st');
  }


  function DEBUG(saDebug) {
    return saDebug.log('stm:st');
  }

})();
