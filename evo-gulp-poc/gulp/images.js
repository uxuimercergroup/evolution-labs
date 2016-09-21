var gulp       = require('gulp');                 // Require Gulp
    config     = require('../gulp.config')();     // Require Gulp config
    plugins    = require('gulp-load-plugins')();  // Require Gulp Load Plugins plugin
    notifier   = require('node-notifier');        // Require Gulp Notify and Notifier
    argv       = require('yargs').argv;           // Require Yargs
    production = !!(argv.production);             // Check for --production flag


// Copy images to the "dist" folder
// In production, the images are optimized and compressed
gulp.task('images', function(){
  return gulp.src(config.src.images)
  .pipe(plugins.newer(config.dest.images))
  .pipe(plugins.if(production, plugins.imagemin({
    progressive: true
  })))
  .pipe(gulp.dest(config.dest.images));
});

// Images Notifier Task
gulp.task('images:notify', function(){
  notifier.notify({
    title: config.notify.images.title,
    message: config.notify.images.message
  });
});