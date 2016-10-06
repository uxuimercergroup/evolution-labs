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
          paths.src + 'fonts/**/*',
          paths.src + '**/*.scss',
          paths.src + 'icomoon/**/*.json'
        ],
        assets_base: paths.src,
        images: paths.src + 'images/**/*',
        scss : paths.src + '**/*.scss'
      },
      dest: {
        assets: paths.dest,
        images: paths.dest + 'images/'
      }
  };

  return config;
};