module.exports = function(){

  var paths = {
    src: 'src/',
    dest: 'dist/'
  };

  var config = {
      global: {
        src: paths.src,
        dest: paths.dest
      },
      src: {
        assets: [
          paths.src + '**/*.html',
          paths.src + '**/*.js',
          paths.src + '**/*.md',
          paths.src + '**/*.scss'
        ],
        assets_base: paths.src,
        images: paths.src + 'images/**/*',
        scss : paths.src + '**/*.scss',
        js: paths.src + '**/*.js',
      },
      dest: {
        assets: paths.dest,
        images: paths.dest + 'images/'
      }
  };

  return config;
};