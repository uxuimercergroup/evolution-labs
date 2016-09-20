// Require Gulp
var gulp = require('gulp');

// Require Gulp config
var config = require('../gulp.config')();

// Require Gulp Load Plugins plugin
var plugins = require('gulp-load-plugins')();

// Require Gulp Notify and Notifier
var notifier = require('node-notifier');

// Require Yargs
var argv = require('yargs').argv;

// Check for --production flag
var production = !!(argv.production);


// Copy images to the "dist" folder
// In production, the images are optimized and compressed
gulp.task('images', function(){
  return gulp.src(config.src.images)
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