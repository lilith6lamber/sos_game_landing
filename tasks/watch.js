const {
  watch,
  parallel,
  series
} = require('gulp');

module.exports = function watching() {
  watch('src/**/*.html', parallel('html'));
  watch('src/favicon/**.*', parallel('favicon'));
  watch('src/plugins/*.css', parallel('libs_style'));
  watch('src/plugins/*.js', parallel('libs_js'));
  watch('src/**/*.php', parallel('php'));
  watch('src/**/*.scss', parallel('style'));
  watch('src/**/*.js', parallel('dev_js'));
  watch('src/**/*.json', parallel('html'));
  watch('src/img/**/*.+(svg|ico)', parallel('rastr'));
  watch('src/img/**/*.+(png|jpg|jpeg|gif)', series('rastr', 'webp'));
  watch('src/fonts/**/*.ttf', series('ttf', 'ttf2', 'fonts'));
}