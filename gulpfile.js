require('sistemium-gulp')
  .config({
    ngModule: 'stcom',
    browserSync: {
      port: 3010,
      ui: {
        port: 3011
      },
      ghostMode: false
    },
    build: {
      replace: {
        css: {
          'url(MaterialIcons': 'url(../fonts/MaterialIcons'
        }
      }
    }
  })
  .run(require('gulp'));
